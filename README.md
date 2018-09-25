## HSL Color Picker & Eye Dropper

An Electron application targeted to Windows

### Todos

- [ ] Add selection of color options for dropper box outline

### Troubleshooting Build Process

- had to manually copy static folder into `node_modules/electron/dist/resources/static` for app to access to `__static` in production and in compiled app

- had to delete require and install of `source-map` in `dist/main/main.js` and `dist/renderer/index.html` for compiled version of app to work

- had to remove the import of `electron-devtools-extension` since dev dependencies are not compiled
- changed it to a regular dependency to troubleshoot compiled app
- changed import to an inline require statement
