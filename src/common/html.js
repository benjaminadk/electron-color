import path from 'path'
import url from 'url'

export const MAIN_HTML_DEV = `http://localhost:${
  process.env.ELECTRON_WEBPACK_WDS_PORT
}`

export const MAIN_HTML_PROD = url.format({
  pathname: path.resolve(__dirname, '../', 'renderer', 'index.html'),
  protocol: 'file',
  slashes: true
})
