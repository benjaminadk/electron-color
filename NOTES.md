### Troubleshooting Build Process

- building for windows nsis

- Electron 3.0.0, Electron Webpack 2.3.1, Electron Builder 20.29.4

- had to manually copy static folder into `node_modules/electron/dist/resources/static` for app to access to `__static` in production and in compiled app

- have to manually delete require and install of `source-map` in `dist/main/main.js` and `dist/renderer/index.html` for compiled version of app to work every time I compile app - add to dependencies??? - should try - WORKS

- had to remove the import of `electron-devtools-extension` since dev dependencies are not compiled

  - changed it to a regular dependency to troubleshoot compiled app
  - changed import to an inline require statement
  - change back to dev before publication

- have to run build outside of VSCode in non-integrated terminal due to busy file error with `app.asar`

### Electron Bugs

- dynamic sizing of BrowserWindow different in development and production

### Appveyer Notes
