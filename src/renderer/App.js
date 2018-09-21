import React, { Component } from 'react'
import { remote, ipcRenderer } from 'electron'
import getScreen from 'common/getScreen'
import { MAIN_HTML } from 'common/html'
import Options from './Options'
import ColorPicker from './ColorPicker'
import Dropper from './Dropper'
import fs from 'fs'
import path from 'path'
import rgbToHsl from 'rgb-to-hsl'

const [screenWidth, screenHeight] = getScreen()
var mainWin = remote.BrowserWindow.fromId(1)
var dropperWin

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      windowId: null,
      h: null,
      s: null,
      l: null,
      a: null,
      colors: null,
      optionsMode: false,
      options: {
        alpha: false
      }
    }
  }

  componentWillMount() {
    this.setWindowId()
    this.setMainMenu()
    this.initSavedColors()
  }

  setWindowId = () => {
    let windowId = remote.getCurrentWindow().id
    this.setState({ windowId })
  }

  setMainMenu = () => {
    let windowId = remote.getCurrentWindow().id
    if (windowId === 1) {
      let template = [
        {
          label: 'File',
          submenu: [
            {
              label: 'Options',
              click: () => this.enterOptions()
            },
            { type: 'separator' },
            { role: 'quit' }
          ]
        },
        {
          label: 'Dropper',
          click: () => this.initDropper()
        }
      ]
      mainWin.setMenu(remote.Menu.buildFromTemplate(template))
    }
  }

  initSavedColors = () => {
    var colors
    fs.readFile(path.resolve(__static, 'colors.json'), (error, data) => {
      if (error) throw error
      if (!data.length) {
        colors = []
        for (let i = 0; i < 64; i++) {
          colors[i] = { color: 'transparent', clean: true, type: null }
        }
        this.setState({ colors })
      } else {
        colors = JSON.parse(data)
        this.setState({ colors })
      }
    })
  }

  initDropper = () => {
    ipcRenderer.once('dropper', (event, color) => {
      color && this.addNewColor(color, 'rgb')
      mainWin.show()
    })

    mainWin.hide()

    dropperWin = new remote.BrowserWindow({
      width: screenWidth,
      height: screenHeight,
      frame: false,
      transparent: true,
      alwaysOnTop: true
    })

    //dropperWin.webContents.openDevTools({ mode: 'bottom' })

    dropperWin.loadURL(MAIN_HTML)

    dropperWin.on('close', () => {
      dropperWin = null
    })
  }

  enterOptions = () => this.setState({ optionsMode: true })

  addNewColor = (color, type) => {
    const { colors } = this.state
    let newColor = { color, clean: false, type }
    let firstOpen = colors.findIndex(c => c.clean)
    colors[firstOpen] = newColor
    this.setState({ colors })
    this.handleSwatchClick(newColor)
    fs.writeFile(
      path.resolve(__static, 'colors.json'),
      JSON.stringify(colors),
      error => {
        if (error) throw error
      }
    )
  }

  resetSavedColors = () => {
    let userInput = confirm(`Discard ALL Saved Colors? This CANNOT be undone!`)
    if (userInput) {
      localStorage.removeItem('COLORS')
      this.initSavedColors()
    }
  }

  saveOptions = options => this.setState({ options })

  exitOptions = () => this.setState({ optionsMode: false })

  handleSwatchClick = c => {
    if (c.color === 'none') return
    var h, s, l, a, rgb, hsl
    if (c.type === 'rgb') {
      rgb = c.color.replace(/[^\d,]/g, '').split(',')
      hsl = rgbToHsl(...rgb)
      h = Math.round(hsl[0])
      s = Math.round(parseInt(hsl[1]), 10)
      l = Math.round(parseInt(hsl[2]), 10)
      if (hsl.length > 3) {
        a = parseInt(hsl[3], 10)
      } else {
        a = 100
      }
      this.setState({ h, s, l, a })
    } else if (c.type === 'hsl') {
      hsl = c.color.replace(/[^\d,]/g, '').split(',')
      h = hsl[0]
      s = hsl[1]
      l = hsl[2]
      if (hsl.length > 3) {
        a = parseInt(hsl[3], 10)
      } else {
        a = 100
      }
      this.setState({ h, s, l, a })
    }
  }

  render() {
    const { windowId, h, s, l, a, colors, optionsMode, options } = this.state
    if (windowId === 1) {
      if (optionsMode) {
        return (
          <Options
            options={options}
            saveOptions={this.saveOptions}
            exitOptions={this.exitOptions}
          />
        )
      }
      return (
        <div style={{ height: screenHeight - 35 }}>
          <ColorPicker
            h={h}
            s={s}
            l={l}
            a={a}
            options={options}
            colors={colors}
            handleSwatchClick={this.handleSwatchClick}
            addNewColor={this.addNewColor}
            enterOptions={this.enterOptions}
            resetSavedColors={this.resetSavedColors}
          />
        </div>
      )
    } else {
      return <Dropper width={screenWidth} height={screenHeight} />
    }
  }
}
