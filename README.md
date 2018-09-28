## HSL Color Picker & Eye Dropper

An Electron application targeted to Windows

### Todos

- [x] Add outline color to options - is wired up in state already
- [ ] Add compact option
- [x] Fix buttons and spacing in options
- [x] Use `systemPreferences` to set Material-UI primary color
- [x] Add Palette Feature
  - [x] Add `palettes.json` and read on load
  - [x] Style Material-UI Dialog to look more native
  - [x] Display stats or more UI in Palettes
- [x] Adjust spacing for hidden opacity bar - temp solution is margin top on stat inputs changes with alpha state
- [ ] Error messages for fs errors???
- [ ] Change native electron dialog (discard color) to Material-UI style to match palette dialog
  - [ ] When deleting color tile
  - [ ] When deleting color palette
- [x] Add right click context menu for deleting single color square
- [x] Add complementary and other quick color generators with math
- [x] Remove `type` property from all colors - added auto convert to dropper
- [x] Add arrows or wheel listener to adjust H,S,L,A in color picker
- [ ] Add UI to show full palette when adding 65th color

### Troubleshooting Build Process

- building for windows nsis

- Electron 3.0.0, Electron Webpack 2.3.1, Electron Builder 20.29.4

- had to manually copy static folder into `node_modules/electron/dist/resources/static` for app to access to `__static` in production and in compiled app

- have to manually delete require and install of `source-map` in `dist/main/main.js` and `dist/renderer/index.html` for compiled version of app to work every time I compile app - add to dependencies??? - should try

- had to remove the import of `electron-devtools-extension` since dev dependencies are not compiled
  - changed it to a regular dependency to troubleshoot compiled app
  - changed import to an inline require statement
  - change back to dev before publication
