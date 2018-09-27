import React, { Component } from 'react'
import { remote, ipcRenderer } from 'electron'
import getScreen from 'common/getScreen'
import getMainWinDimens from 'common/getMainWinDimens'
import toHSLString from './utils/toHSLString'
import toHSLParts from './utils/toHSLParts'
import { MAIN_HTML_DEV, MAIN_HTML_PROD } from 'common/html'
import Options from './components/App/Options'
import Palettes from './components/App/Palettes'
import PalettePrompt from './components/App/PalettePrompt'
import ColorPicker from './ColorPicker'
import Dropper from './Dropper'
import fs from 'fs'
import path from 'path'
import rgbToHsl from 'rgb-to-hsl'

const inDev = process.env.NODE_ENV === 'development'
const [screenWidth, screenHeight] = getScreen()
const [mainWidth, mainHeight, mainX, mainY] = getMainWinDimens()
const PALETTES_PATH = path.resolve(__static, 'palettes.json')
const COLORS_PATH = path.resolve(__static, 'colors.json')

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
      options: { alpha: false, pinned: false, outlineColor: '#FF0000' },
      palettePrompt: false,
      paletteMode: false,
      palettes: null
    }
  }

  componentWillMount() {
    this.setWindowId()
    this.setMainMenu()
    this.initSavedColors()
    this.initOptions()
    this.initPalettes()
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
            { label: 'Options', click: () => this.enterOptions() },
            { type: 'separator' },
            { role: 'quit' }
          ]
        },
        {
          label: 'Palette',
          submenu: [
            {
              label: 'Save Current Palette',
              click: () => this.openPalettePrompt()
            },
            { label: 'View Saved Palettes', click: () => this.enterPalettes() },
            { type: 'separator' },
            {
              label: 'Clear Current Palette',
              click: () => this.resetSavedColors()
            }
          ]
        },
        {
          label: 'Dropper',
          submenu: [{ label: 'Open', click: () => this.initDropper() }]
        },
        { label: 'Help' }
      ]
      mainWin.setMenu(remote.Menu.buildFromTemplate(template))
    }
  }

  initSavedColors = () => {
    fs.readFile(COLORS_PATH, (error, data) => {
      if (error) throw error
      if (!data.length) {
        this.overwriteColors()
      } else {
        let colors = JSON.parse(data)
        this.setState({ colors })
      }
    })
  }

  initOptions = () => {
    var options
    var filepath = path.resolve(__static, 'options.json')
    fs.readFile(filepath, (error, data) => {
      if (error) throw error
      if (!data.length) {
        return
      } else {
        options = JSON.parse(data)
        options.pinned && mainWin.setAlwaysOnTop(true)
        this.setState({ options })
      }
    })
  }

  initPalettes = () => {
    var palettes
    fs.readFile(PALETTES_PATH, (error, data) => {
      if (error) throw error
      if (!data.length) {
        palettes = []
        this.setState({ palettes })
        return
      } else {
        palettes = JSON.parse(data)
        this.setState({ palettes })
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

    dropperWin.loadURL(inDev ? MAIN_HTML_DEV : MAIN_HTML_PROD)

    dropperWin.on('close', () => {
      dropperWin = null
    })
  }

  addNewColor = (color, type) => {
    var a, cs, newColor
    const { colors } = this.state
    if (type === 'rgb') {
      var rgb = color.replace(/[^\d,]/g, '').split(',')
      var hsl = rgbToHsl(...rgb)
      var h = Math.round(hsl[0])
      var s = Math.round(parseInt(hsl[1]), 10)
      var l = Math.round(parseInt(hsl[2]), 10)
      if (hsl.length > 3) {
        a = parseInt(hsl[3], 10)
        cs = toHSLString(false, h, s, l, a)
      } else {
        a = 100
        cs = toHSLString(true, h, s, l)
      }
      newColor = { color: cs, clean: false, type: 'hsl' }
    } else {
      newColor = { color, clean: false, type: 'hsl' }
    }
    let firstOpen = colors.findIndex(c => c.clean)
    colors[firstOpen] = newColor
    this.handleSwatchClick(newColor)
    this.setState({ colors })
    fs.writeFile(COLORS_PATH, JSON.stringify(colors), error => {
      if (error) throw error
    })
  }

  deleteColor = i => {
    const { colors } = this.state
    let newColors = colors.filter((c, index) => index !== i)
    newColors.push({ color: 'transparent', clean: true, type: null })
    this.setState({ colors: newColors })
    fs.writeFile(COLORS_PATH, JSON.stringify(newColors), error => {
      if (error) throw error
    })
  }

  resetSavedColors = () => {
    let confirmed = confirm(`Discard ALL Saved Colors? This CANNOT be undone!`)
    if (confirmed) {
      this.overwriteColors()
    }
  }

  overwriteColors = () => {
    var colors = []
    for (let i = 0; i < 64; i++) {
      colors[i] = { color: 'transparent', clean: true, type: null }
    }
    this.setState({ colors })
    fs.writeFile(COLORS_PATH, JSON.stringify(colors), error => {
      if (error) throw error
    })
  }

  enterOptions = () =>
    this.setState({
      optionsMode: true
    })

  saveOptions = options => {
    this.setState({ options })
    fs.writeFile(
      path.resolve(__static, 'options.json'),
      JSON.stringify(options),
      error => {
        if (error) throw error
      }
    )
  }

  exitOptions = () =>
    this.setState({
      optionsMode: false
    })

  enterPalettes = () => this.setState({ paletteMode: true })

  openPalettePrompt = () => {
    const { colors, optionsMode, paletteMode } = this.state
    if (optionsMode || paletteMode || colors[0].clean) return
    this.setState({ palettePrompt: true })
  }

  closePalettePrompt = () => this.setState({ palettePrompt: false })

  savePalette = title => {
    const { colors, palettes } = this.state
    var palette = { title, colors }
    let index = palettes.findIndex(p => p.title === title)
    if (index === -1) {
      palettes.push(palette)
    } else {
      palettes[index] = palette
    }
    this.setState({ palettes })
    fs.writeFile(PALETTES_PATH, JSON.stringify(palettes), error => {
      if (error) throw error
    })
  }

  updatePalette = (i, colors) => {
    const { palettes } = this.state
    palettes[i].colors = colors
    this.setState({ palettes })
    fs.writeFile(PALETTES_PATH, JSON.stringify(palettes), error => {
      if (error) throw error
    })
  }

  loadPalette = colors => this.setState({ colors, paletteMode: false })

  deletePalette = (i, title) => {
    let confirmed = confirm(`Delete Palette: ${title}`)
    if (confirmed) {
      const { palettes } = this.state
      let newPalettes = palettes.filter((p, index) => i !== index)
      this.setState({ palettes: newPalettes })
      fs.writeFile(PALETTES_PATH, JSON.stringify(newPalettes), error => {
        if (error) throw error
      })
    }
  }

  exitPalettes = () => this.setState({ paletteMode: false })

  handleSwatchClick = c => {
    if (c === 'none') return
    var [bool, h, s, l, a] = toHSLParts(c.color)
    this.setState({ h, s, l, a })
  }

  handleContextMenu = (e, c, i) => {
    e.preventDefault()
    if (c.clean) return
    const template = [
      { label: 'Color Generators', enabled: false },
      { type: 'separator' },
      {
        label: 'Complementary',
        click: () => this.makeCompColor(c, i)
      },
      {
        label: 'Split Complementary',
        click: () => this.makeSplitCompColor(c, i)
      },
      { label: 'Triadic', click: () => this.makeTriadicColor(c, i) },
      { label: 'Tetradic', click: () => this.makeTetradic(c, i) },
      { label: 'Analagous', click: () => this.makeAnalogous(c, i) },
      { type: 'separator' },
      { label: 'Delete Color', click: () => this.deleteColor(i) }
    ]
    const menu = remote.Menu.buildFromTemplate(template)
    menu.popup({ window: remote.getCurrentWindow() })
  }

  makeCompColor = (c, i) => {
    const { colors } = this.state
    if (!colors[63].clean) return
    var [bool, h, s, l, a] = toHSLParts(c.color)
    h = Math.abs(h - 180)
    const cs = toHSLString(bool, h, s, l, a)
    const color = { color: cs, clean: false, type: 'hsl' }
    colors.splice(i + 1, 0, color)
    colors.pop()
    this.setState({ colors })
    this.handleSwatchClick(c)
    fs.writeFile(COLORS_PATH, JSON.stringify(colors), error => {
      if (error) throw error
    })
  }

  makeSplitCompColor = (c, i) => {
    const { colors } = this.state
    if (!colors[62].clean) return
    var h1, h2, cs1, cs2
    var [bool, h, s, l, a] = toHSLParts(c.color)
    h1 = Math.abs(h - 210)
    h2 = Math.abs(h - 150)
    cs1 = toHSLString(bool, h1, s, l, a)
    cs2 = toHSLString(bool, h2, s, l, a)
    const color1 = { color: cs1, clean: false, type: 'hsl' }
    const color2 = { color: cs2, clean: false, type: 'hsl' }
    colors.splice(i + 1, 0, color1, color2)
    colors.pop()
    colors.pop()
    this.setState({ colors })
    this.handleSwatchClick(c)
    fs.writeFile(COLORS_PATH, JSON.stringify(colors), error => {
      if (error) throw error
    })
  }

  makeTriadicColor = (c, i) => {
    const { colors } = this.state
    if (!colors[62].clean) return
    var h1, h2, cs1, cs2
    var [bool, h, s, l, a] = toHSLParts(c.color)
    h1 = Math.abs(h - 240)
    h2 = Math.abs(h - 120)
    cs1 = toHSLString(bool, h1, s, l, a)
    cs2 = toHSLString(bool, h2, s, l, a)
    const color1 = { color: cs1, clean: false, type: 'hsl' }
    const color2 = { color: cs2, clean: false, type: 'hsl' }
    colors.splice(i + 1, 0, color1, color2)
    colors.pop()
    colors.pop()
    this.setState({ colors })
    this.handleSwatchClick(c)
    fs.writeFile(COLORS_PATH, JSON.stringify(colors), error => {
      if (error) throw error
    })
  }

  makeTetradic = (c, i) => {
    const { colors } = this.state
    if (!colors[61].clean) return
    var h1, h2, h3, cs1, cs2, cs3
    var [bool, h, s, l, a] = toHSLParts(c.color)
    h1 = Math.abs(h - 270)
    h2 = Math.abs(h - 180)
    h3 = Math.abs(h - 90)
    cs1 = toHSLString(bool, h1, s, l, a)
    cs2 = toHSLString(bool, h2, s, l, a)
    cs3 = toHSLString(bool, h3, s, l, a)
    const color1 = { color: cs1, clean: false, type: 'hsl' }
    const color2 = { color: cs2, clean: false, type: 'hsl' }
    const color3 = { color: cs3, clean: false, type: 'hsl' }
    colors.splice(i + 1, 0, color1, color2, color3)
    for (let i = 0; i < 3; i++) colors.pop()
    this.setState({ colors })
    this.handleSwatchClick(c)
    fs.writeFile(COLORS_PATH, JSON.stringify(colors), error => {
      if (error) throw error
    })
  }

  makeAnalogous = (c, i) => {
    const { colors } = this.state
    if (!colors[60].clean) return
    var h1, h2, h3, h4, cs1, cs2, cs3, cs4
    var [bool, h, s, l, a] = toHSLParts(c.color)
    h1 = Math.abs(h - 330)
    h2 = Math.abs(h - 300)
    h3 = Math.abs(h - 270)
    h4 = Math.abs(h - 240)
    cs1 = toHSLString(bool, h1, s, l, a)
    cs2 = toHSLString(bool, h2, s, l, a)
    cs3 = toHSLString(bool, h3, s, l, a)
    cs4 = toHSLString(bool, h4, s, l, a)
    const color1 = { color: cs1, clean: false, type: 'hsl' }
    const color2 = { color: cs2, clean: false, type: 'hsl' }
    const color3 = { color: cs3, clean: false, type: 'hsl' }
    const color4 = { color: cs4, clean: false, type: 'hsl' }
    colors.splice(i + 1, 0, color1, color2, color3, color4)
    for (let i = 0; i < 4; i++) colors.pop()
    this.setState({ colors })
    this.handleSwatchClick(c)
    fs.writeFile(COLORS_PATH, JSON.stringify(colors), error => {
      if (error) throw error
    })
  }

  makeMonochromeColor = (c, i) => {}

  render() {
    const {
      windowId,
      h,
      s,
      l,
      a,
      colors,
      optionsMode,
      options,
      palettePrompt,
      paletteMode,
      palettes
    } = this.state
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
      if (paletteMode) {
        return (
          <Palettes
            palettes={palettes}
            updatePalette={this.updatePalette}
            loadPalette={this.loadPalette}
            deletePalette={this.deletePalette}
            exitPalettes={this.exitPalettes}
          />
        )
      }
      return [
        <div key="main" style={{ height: mainHeight, marginTop: '10px' }}>
          <ColorPicker
            h={h}
            s={s}
            l={l}
            a={a}
            options={options}
            colors={colors}
            handleContextMenu={this.handleContextMenu}
            handleSwatchClick={this.handleSwatchClick}
            addNewColor={this.addNewColor}
            enterOptions={this.enterOptions}
            resetSavedColors={this.resetSavedColors}
          />
        </div>,
        <PalettePrompt
          key="prompt"
          open={palettePrompt}
          onClose={this.closePalettePrompt}
          savePalette={this.savePalette}
        />
      ]
    } else {
      return (
        <Dropper width={screenWidth} height={screenHeight} options={options} />
      )
    }
  }
}
