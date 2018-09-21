import { app, BrowserWindow } from 'electron'
import installExtension, {
  REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer'
import getMainWinDimens from 'common/getMainWinDimens'
import { MAIN_HTML } from 'common/html'

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
    maximizable: false
  })

  inDev && setupDevtools()

  mainWin.loadURL(MAIN_HTML)

  mainWin.setMenu(null)

  mainWin.on('close', () => {
    mainWin = null
  })
}

function setupDevtools() {
  mainWin.webContents.openDevTools({ mode: 'detach' })

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Installed -->  ${name}`))
    .catch(console.log)
}

app.on('ready', createMainWindow)

app.on('window-all-closed', () => app.quit())
