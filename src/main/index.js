import { app, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
import getMainWinDimens from 'common/getMainWinDimens'
import { MAIN_HTML_DEV, MAIN_HTML_PROD } from 'common/html'
import icons from 'common/icons'

let mainWin

const firstInstance = app.requestSingleInstanceLock()
const inDev = process.env.NODE_ENV === 'development'

function createMainWindow() {
  autoUpdater.checkForUpdatesAndNotify()
  const [width, height, x, y] = getMainWinDimens()

  mainWin = new BrowserWindow({
    width,
    height,
    x,
    y,
    useContentSize: true,
    resizable: false,
    maximizable: false,
    icon: icons.MAIN_ICON,
    title: `Color Tool`
  })

  mainWin.loadURL(inDev ? MAIN_HTML_DEV : MAIN_HTML_PROD)

  setupDevtools()

  mainWin.setMenu(null)

  mainWin.on('close', () => {
    mainWin = null
  })
}

function setupDevtools() {
  if (!inDev) return
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS
  } = require('electron-devtools-installer')
  mainWin.webContents.openDevTools({ mode: 'detach' })

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Installed -->  ${name}`))
    .catch(console.log)
}

if (!firstInstance) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (mainWin) {
      if (mainWin.isMinimized()) mainWin.restore()
      mainWin.focus()
    }
  })
  app.on('ready', createMainWindow)
  app.on('window-all-closed', () => app.quit())
}
