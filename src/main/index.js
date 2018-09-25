import { app, BrowserWindow } from 'electron'
import getMainWinDimens from 'common/getMainWinDimens'
import { MAIN_HTML_DEV, MAIN_HTML_PROD } from 'common/html'
import { MAIN_ICON } from 'common/icon'

let mainWin

const inDev = process.env.NODE_ENV === 'development'

function createMainWindow() {
  const [width, height, x, y] = getMainWinDimens()

  mainWin = new BrowserWindow({
    width,
    height,
    x,
    y,
    resizable: false,
    maximizable: false,
    icon: MAIN_ICON,
    title: 'HSL Color Picker'
  })

  mainWin.loadURL(inDev ? MAIN_HTML_DEV : MAIN_HTML_PROD)

  setupDevtools()

  mainWin.setMenu(null)

  mainWin.on('close', () => {
    mainWin = null
  })
}

function setupDevtools() {
  //if (!inDev) return
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS
  } = require('electron-devtools-installer')
  mainWin.webContents.openDevTools({ mode: 'detach' })

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Installed -->  ${name}`))
    .catch(console.log)
}

app.on('ready', createMainWindow)

app.on('window-all-closed', () => app.quit())
