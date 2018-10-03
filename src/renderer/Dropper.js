import React, { Component } from 'react'
import { remote, desktopCapturer } from 'electron'
import IconBar from './components/Dropper/IconBar'
import ColorOutput from './components/Dropper/ColorOutput'
import CanvasStack from './components/Dropper/CanvasStack'
import rgbToHsl from 'rgb-to-hsl'
import toHSLString from './utils/toHSLString'
import toHSLParts from './utils/toHSLParts'

const VIDEO_CSS = 'position:absolute;top:-10000px;left:-10000px;'
const CANVAS_WIDTH = 100
const CANVAS_HEIGHT = 100

/**
 *  Canvas Assignments
 *
 *  c0 - snapshot of entire screen - off screen
 *  c1 - zoomed in portion 10 x 10 pixels - on screen
 *  c2 - grid that isolates each pixel - on screen
 *  c3 - temporary draw portion without scale - off screen
 */

export default class Dropper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      freeze: false,
      context: null,
      color: false,
      boxIndex: null,
      x: null,
      y: null
    }

    this.c1 = React.createRef()
    this.c2 = React.createRef()
    this.topLayer = React.createRef()
  }

  componentDidMount() {
    this.createCanvases()
    this.captureScreen()
    this.drawGrid()
  }

  createCanvases = () => {
    this.c0 = document.createElement('canvas')
    this.ctx0 = this.c0.getContext('2d')
    this.c3 = document.createElement('canvas')
    this.ctx3 = this.c3.getContext('2d')
    this.ctx1 = this.c1.current.getContext('2d')
    this.ctx1.scale(10, 10)
    this.ctx1.imageSmoothingEnabled = false
  }

  captureScreen = () => {
    const { width, height } = this.props
    desktopCapturer.getSources({ types: ['screen'] }, (error, sources) => {
      if (error) console.log(error)
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sources[0].id,
              minWidth: width,
              maxWidth: width,
              minHeight: height,
              maxHeight: height
            }
          }
        })
        .then(stream => {
          var video = document.createElement('video')
          video.style.cssText = VIDEO_CSS

          video.onloadedmetadata = () => {
            this.c0.width = video.videoWidth
            this.c0.height = video.videoHeight
            this.ctx0.drawImage(video, 0, 0, this.c0.width, this.c0.height)
            video.remove()
            stream.getTracks()[0].stop()
            this.setState({ loading: false, freeze: false, boxIndex: null })
          }

          video.src = window.URL.createObjectURL(stream)
          document.body.appendChild(video)
        })
        .catch(console.log)
    })
  }

  analyzePixels = () => {
    var arr = []
    var obj = {}
    var hsl, hsl2, str
    let p = this.ctx0.getImageData(0, 0, this.c0.width, this.c0.height).data
    for (let i = 0; i < p.length; i += 4) {
      hsl = rgbToHsl(p[i], p[i + 1], p[i + 2])
      hsl2 = `hsl(${parseInt(hsl[0], 10)}, ${parseInt(hsl[1], 10)},${parseInt(hsl[2], 10)})`
      var [bool, h, s, l, a] = toHSLParts(hsl2)
      if (s > 25 && l > 25 && l < 90) {
        str = toHSLString(
          false,
          Math.round(h / 2) * 2,
          Math.round(s / 5) * 5,
          Math.round(l / 5) * 5
        )
        arr.push(str)
      }
    }
    arr.forEach(a => {
      if (obj[a]) obj[a]++
      else obj[a] = 1
    })
    var sortable = []
    for (var color in obj) {
      sortable.push([color, obj[color]])
    }
    var top = sortable.sort((a, b) => b[1] - a[1]).slice(0, 8)
    remote.BrowserWindow.fromId(1).webContents.send('analyzer', top)
    remote.getCurrentWindow().close()
  }

  drawGrid = () => {
    this.ctx2 = this.c2.current.getContext('2d')
    for (let i = 0; i <= CANVAS_WIDTH; i += 10) {
      this.ctx2.moveTo(i, 0)
      this.ctx2.lineTo(i, CANVAS_HEIGHT)
    }
    for (let i = 0; i <= CANVAS_HEIGHT; i += 10) {
      this.ctx2.moveTo(0, i)
      this.ctx2.lineTo(CANVAS_WIDTH, i)
    }
    this.ctx2.strokeStyle = 'rgba(0,0,0,.5)'
    this.ctx2.stroke()
  }

  handleClickMain = e => {
    const { loading } = this.state
    if (loading) return
    this.setState({ freeze: true })
    this.topLayer.current.addEventListener('click', this.selectPixelClick)
    document.body.addEventListener('keydown', this.changeBoxIndex)
  }

  selectPixelClick = e => {
    let x = Math.ceil(e.layerX / 10)
    let y = Math.ceil(e.layerY / 10)
    let p = this.ctx3.getImageData(x - 1, y - 1, 1, 1).data
    let a = (p[3] / 255).toFixed(2)
    this.setState({
      color:
        a === '1.00' ? `rgb(${p[0]}, ${p[1]}, ${p[2]})` : `rgba(${p[0]}, ${p[1]}, ${p[2]}, ${a})`
    })
  }

  selectPixelMove = () => {
    const { boxIndex } = this.state
    if (!boxIndex) return
    let x = Math.ceil(document.querySelector(`[data-index='${boxIndex}']`).offsetLeft / 10)
    let y = Math.ceil(document.querySelector(`[data-index='${boxIndex}']`).offsetTop / 10)
    let p = this.ctx3.getImageData(x, y, 1, 1).data
    let a = (p[3] / 255).toFixed(2)
    this.setState({
      color:
        a === '1.00' ? `rgb(${p[0]}, ${p[1]}, ${p[2]})` : `rgba(${p[0]}, ${p[1]}, ${p[2]}, ${a})`
    })
  }

  handleMouseMoveMain = e => {
    const { loading, freeze } = this.state
    if (loading || freeze) return
    let x = e.screenX - 5
    let y = e.screenY - 5
    let imageData = this.ctx0.getImageData(x, y, 10, 10)
    this.ctx3.putImageData(imageData, 0, 0)
    this.ctx1.drawImage(this.c3, 0, 0)
    this.setState({ x, y })
  }

  shiftCanvasLeft = () => {
    const { x, y } = this.state
    if (x === 0) return
    let imageData = this.ctx0.getImageData(x - 1, y, 10, 10)
    this.ctx3.putImageData(imageData, 0, 0)
    this.ctx1.drawImage(this.c3, 0, 0)
    this.selectPixelMove()
    this.setState({ x: x - 1 })
  }

  shiftCanvasRight = () => {
    const { x, y } = this.state
    const { width } = this.props
    if (x === width - 10) return
    let imageData = this.ctx0.getImageData(x + 1, y, 10, 10)
    this.ctx3.putImageData(imageData, 0, 0)
    this.ctx1.drawImage(this.c3, 0, 0)
    this.selectPixelMove()
    this.setState({ x: x + 1 })
  }

  shiftCanvasUp = () => {
    const { x, y } = this.state
    if (y === 0) return
    let imageData = this.ctx0.getImageData(x, y - 1, 10, 10)
    this.ctx3.putImageData(imageData, 0, 0)
    this.ctx1.drawImage(this.c3, 0, 0)
    this.selectPixelMove()
    this.setState({ y: y - 1 })
  }

  shiftCanvasDown = () => {
    const { x, y } = this.state
    const { height } = this.props
    if (y === height - 10) return
    let imageData = this.ctx0.getImageData(x, y + 1, 10, 10)
    this.ctx3.putImageData(imageData, 0, 0)
    this.ctx1.drawImage(this.c3, 0, 0)
    this.selectPixelMove()
    this.setState({ y: y + 1 })
  }

  setBoxIndex = boxIndex => {
    if (!this.state.freeze) return
    this.setState({ boxIndex })
  }

  changeBoxIndex = e => {
    const { boxIndex } = this.state
    if (boxIndex === null) return
    let keys = [37, 38, 39, 40]
    let key = e.keyCode
    if (keys.indexOf(key) === -1) return
    if (key === 37) {
      if (boxIndex % 10 === 0) {
        return this.shiftCanvasLeft()
      }
      this.setState({ boxIndex: boxIndex - 1 })
    } else if (key === 38) {
      if (boxIndex < 10) {
        return this.shiftCanvasUp()
      }
      this.setState({ boxIndex: boxIndex - 10 })
    } else if (key === 39) {
      if ((boxIndex + 1) % 10 === 0) {
        return this.shiftCanvasRight()
      }
      this.setState({ boxIndex: boxIndex + 1 })
    } else if (key === 40) {
      if (boxIndex > 89) {
        return this.shiftCanvasDown()
      }
      this.setState({ boxIndex: boxIndex + 10 })
    }
    this.selectPixelMove()
  }

  selectColor = () => {
    const { color } = this.state
    remote.BrowserWindow.fromId(1).webContents.send('dropper', color)
    remote.getCurrentWindow().close()
  }

  refresh = () => {
    this.setState({ loading: true })
    this.ctx0.clearRect(0, 0, this.c0.width, this.c0.height)
    this.ctx1.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    this.topLayer.current.removeEventListener('click', this.selectPixelClick)
    document.body.removeEventListener('keydown', this.changeBoxIndex)
    this.captureScreen()
  }

  exit = () => {
    remote.BrowserWindow.fromId(1).webContents.send('dropper', false)
    remote.getCurrentWindow().close()
  }

  render() {
    const {
      width,
      height,
      options: { outlineColor }
    } = this.props
    const { loading, color, boxIndex } = this.state
    return (
      <div
        style={{ width, height }}
        className="Dropper"
        onClick={this.handleClickMain}
        onMouseMove={this.handleMouseMoveMain}
      >
        <div className="drop-window" style={{ opacity: loading ? 0 : 1 }}>
          <IconBar
            selectColor={this.selectColor}
            refresh={this.refresh}
            analyzePixels={this.analyzePixels}
            exit={this.exit}
          />
          <CanvasStack
            c1Ref={this.c1}
            c2Ref={this.c2}
            topLayerRef={this.topLayer}
            boxIndex={boxIndex}
            outlineColor={outlineColor}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            setBoxIndex={this.setBoxIndex}
            shiftCanvasUp={this.shiftCanvasUp}
            shiftCanvasRight={this.shiftCanvasRight}
            shiftCanvasDown={this.shiftCanvasDown}
            shiftCanvasLeft={this.shiftCanvasLeft}
          />
          <ColorOutput color={color} />
        </div>
      </div>
    )
  }
}
