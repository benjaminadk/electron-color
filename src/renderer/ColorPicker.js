import React, { Component } from 'react'
import ColorBar from './components/ColorPicker/ColorBar'
import StatInput from './components/ColorPicker/StatInput'
import MainSwatch from './components/ColorPicker/MainSwatch'
import StatOutput from './components/ColorPicker/StatOutput'
import MainActions from './components/ColorPicker/MainActions'
import HSLtoRGBorHEX from './utils/HSLtoRGBorHEX'
import HSLAtoRGBAorHEXA from './utils/HSLAtoRGBAorHEXA'

const BAR_HEIGHT = 16
const BAR_WIDTH = 360
const HUE_WIDTH = 1
const SLICE_WIDTH = 3.6

export default class ColorPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hue: 180,
      hueLeft: 172,
      sat: 100,
      satLeft: 352,
      lit: 50,
      litLeft: 172,
      opa: 100,
      opaLeft: 352
    }

    this.hue = React.createRef()
    this.hueThumb = React.createRef()
    this.sat = React.createRef()
    this.satThumb = React.createRef()
    this.lit = React.createRef()
    this.litThumb = React.createRef()
    this.opa = React.createRef()
    this.opaThumb = React.createRef()
  }

  componentDidMount() {
    this.createPickerBars()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.h !== this.props.h) {
      let { h, s, l, a } = this.props
      let hue = h
      let hueLeft = h - 8
      let sat = s
      let satLeft = Math.round(s * 3.6) - 8
      let lit = l
      let litLeft = Math.round(l * 3.6) - 8
      let opa = a
      let opaLeft = Math.round(a * 3.6) - 8
      this.setState(
        { hue, hueLeft, sat, satLeft, lit, litLeft, opa, opaLeft },
        () => this.updatePickerBars()
      )
    }
  }

  createPickerBars = () => {
    const { hue } = this.state

    for (let i = 0; i <= 360; i++) {
      let slice = document.createElement('div')
      slice.style.width = `${HUE_WIDTH}px`
      slice.style.height = `${BAR_HEIGHT}px`
      slice.style.backgroundColor = `hsl(${i}, 100%, 50%)`
      this.hue.current.appendChild(slice)
    }

    const onMouseMoveHue = e =>
      this.setState({ hueLeft: `${this.getPosition(e)}` })

    const onMouseUpHue = e => {
      this.setColor(e, 'hue')
      document.body.removeEventListener('mousemove', onMouseMoveHue)
      document.body.removeEventListener('mouseup', onMouseUpHue)
    }

    this.hue.current.addEventListener('mousedown', e => {
      this.setColor(e, 'hue')
      document.body.addEventListener('mousemove', onMouseMoveHue)
      document.body.addEventListener('mouseup', onMouseUpHue)
    })

    for (let i = 0; i <= 100; i++) {
      let slice1 = document.createElement('div')
      slice1.className = 'sat-slice'
      slice1.style.width = `${SLICE_WIDTH}px`
      slice1.style.height = `${BAR_HEIGHT}px`
      slice1.style.backgroundColor = `hsl(${hue}, ${i}%, 50%)`
      this.sat.current.appendChild(slice1)

      let slice2 = document.createElement('div')
      slice2.className = 'lit-slice'
      slice2.style.width = `${SLICE_WIDTH}px`
      slice2.style.height = `${BAR_HEIGHT}px`
      slice2.style.backgroundColor = `hsl(${hue}, 100%, ${i}%)`
      this.lit.current.appendChild(slice2)

      let slice3 = document.createElement('div')
      slice3.className = 'opa-slice'
      slice3.style.width = `${SLICE_WIDTH}px`
      slice3.style.height = `${BAR_HEIGHT}px`
      slice3.style.backgroundColor = `hsla(${hue}, 100%, 50%, ${i / 100})`
      this.opa.current.appendChild(slice3)
    }

    const onMouseMoveSat = e =>
      this.setState({ satLeft: `${this.getPosition(e)}` })

    const onMouseUpSat = e => {
      this.setColor(e, 'sat')
      document.body.removeEventListener('mousemove', onMouseMoveSat)
      document.body.removeEventListener('mouseup', onMouseUpSat)
    }

    this.sat.current.addEventListener('mousedown', e => {
      this.setColor(e, 'sat')
      document.body.addEventListener('mousemove', onMouseMoveSat)
      document.body.addEventListener('mouseup', onMouseUpSat)
    })

    const onMouseMoveLit = e =>
      this.setState({ litLeft: `${this.getPosition(e)}` })

    const onMouseUpLit = e => {
      this.setColor(e, 'lit')
      document.body.removeEventListener('mousemove', onMouseMoveLit)
      document.body.removeEventListener('mouseup', onMouseUpLit)
    }

    this.lit.current.addEventListener('mousedown', e => {
      this.setColor(e, 'lit')
      document.body.addEventListener('mousemove', onMouseMoveLit)
      document.body.addEventListener('mouseup', onMouseUpLit)
    })

    const onMouseMoveOpa = e =>
      this.setState({ opaLeft: `${this.getPosition(e)}` })

    const onMouseUpOpa = e => {
      this.setColor(e, 'opa')
      document.body.removeEventListener('mousemove', onMouseMoveOpa)
      document.body.removeEventListener('mouseup', onMouseUpOpa)
    }

    this.opa.current.addEventListener('mousedown', e => {
      this.setColor(e, 'opa')
      document.body.addEventListener('mousemove', onMouseMoveOpa)
      document.body.addEventListener('mouseup', onMouseUpOpa)
    })
  }

  setColor = (e, mode) => {
    let pos = this.getPosition(e)
    let offset = BAR_HEIGHT * 0.5
    if (mode === 'hue') {
      let hue = Math.round(pos + offset)
      this.setState({ hue, hueLeft: pos })
    } else if (mode === 'sat') {
      let sat = Math.round((pos + offset) / SLICE_WIDTH)
      this.setState({ sat, satLeft: pos })
    } else if (mode === 'lit') {
      let lit = Math.round((pos + offset) / SLICE_WIDTH)
      this.setState({ lit, litLeft: pos })
    } else if (mode === 'opa') {
      let opa = Math.round((pos + offset) / SLICE_WIDTH)
      this.setState({ opa, opaLeft: pos })
    }
    this.updatePickerBars()
  }

  getPosition = e => {
    let offset = this.hue.current.offsetLeft
    return Math.max(
      BAR_HEIGHT * -0.5,
      Math.min(e.clientX - offset, BAR_WIDTH - BAR_HEIGHT * 0.5)
    )
  }

  updatePickerBars = () => {
    const { hue } = this.state
    let satSlices = document.getElementsByClassName('sat-slice')
    let litSlices = document.getElementsByClassName('lit-slice')
    let opaSlices = document.getElementsByClassName('opa-slice')

    for (let i = 0; i < satSlices.length; i++) {
      satSlices[i].style.backgroundColor = `hsl(${hue}, ${i}%, 50%)`
      litSlices[i].style.backgroundColor = `hsl(${hue}, 100%, ${i}%)`
      opaSlices[i].style.backgroundColor = `hsla(${hue}, 100%, 50%, ${i / 100})`
    }
  }

  onChange = (e, mode) => {
    const nonDigit = /[^0-9]/g
    let val = e.target.value.replace(nonDigit, '')
    let offset = BAR_HEIGHT * 0.5
    if (mode === 'hue') {
      if (val > 360) val = 360
      this.setState({ hue: val, hueLeft: val - offset }, () =>
        this.updatePickerBars()
      )
    } else {
      if (val > 100) val = 100
      this.setState({
        [mode]: val,
        [`${mode}Left`]: Math.round(val * SLICE_WIDTH) - offset
      })
    }
  }

  addNewColor = () => {
    const { hue, sat, lit, opa } = this.state
    const {
      options: { alpha }
    } = this.props
    let color = alpha
      ? `hsla(${hue}, ${sat}%, ${lit}%, ${(opa * 0.01).toFixed(2)})`
      : `hsl(${hue}, ${sat}%, ${lit}%)`
    this.props.addNewColor(color, 'hsl')
  }

  render() {
    const {
      hue,
      hueLeft,
      sat,
      satLeft,
      lit,
      litLeft,
      opa,
      opaLeft
    } = this.state
    const {
      options: { alpha },
      enterOptions,
      resetSavedColors
    } = this.props
    const hsl = `hsl(${hue}, ${sat}%, ${lit}%)`
    const hsla = `hsla(${hue}, ${sat}%, ${lit}%, ${opa * 0.01})`
    const rgb = HSLtoRGBorHEX(hue, sat, lit, true)
    const rgba = HSLAtoRGBAorHEXA(hue, sat, lit, opa, true)
    const hex = HSLtoRGBorHEX(hue, sat, lit, false)
    const hexa = HSLAtoRGBAorHEXA(hue, sat, lit, opa, false)
    return (
      <div className="ColorPicker">
        <ColorBar
          barRef={this.hue}
          thumbRef={this.hueThumb}
          title="Hue"
          left={hueLeft}
        />
        <ColorBar
          barRef={this.sat}
          thumbRef={this.satThumb}
          title="Saturation"
          left={satLeft}
        />
        <ColorBar
          barRef={this.lit}
          thumbRef={this.litThumb}
          title="Lightness"
          left={litLeft}
        />
        <ColorBar
          barRef={this.opa}
          thumbRef={this.opaThumb}
          title="Alpha"
          left={opaLeft}
        />
        <div className="stats">
          <StatInput
            type="hue"
            value={hue}
            onChange={this.onChange}
            before="H"
            after="&deg;"
          />
          <StatInput
            type="sat"
            value={sat}
            onChange={this.onChange}
            before="S"
            after="%"
          />
          <StatInput
            type="lit"
            value={lit}
            onChange={this.onChange}
            before="L"
            after="%"
          />
          <StatInput
            type="opa"
            value={opa}
            onChange={this.onChange}
            before="A"
            after="%"
          />
        </div>
        <div className="output">
          <MainSwatch alpha={alpha} hsl={hsl} hsla={hsla} />
          <StatOutput
            alpha={alpha}
            hsl={hsl}
            hsla={hsla}
            rgb={rgb}
            rgba={rgba}
            hex={hex}
            hexa={hexa}
          />
        </div>
        <MainActions
          addNewColor={this.addNewColor}
          enterOptions={enterOptions}
          resetSavedColors={resetSavedColors}
        />
      </div>
    )
  }
}
