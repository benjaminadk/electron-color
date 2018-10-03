const HUE = {
  title: 'Hue',
  message: 'Hue determines the color selected and is a value between 0 and 360 degrees.'
}

const SAVE_COLOR = {
  title: 'Save Color',
  message: 'Click to add the current color configuration to the palette.'
}

const DROPPER = {
  title: 'Dropper',
  message:
    'Click to activate the eye dropper feature. This allows the capture of a single pixel color from the current window.'
}

const SAVE_PALETTE = {
  title: 'Save Palette',
  message:
    'Click to save the entire 64 tile palette. User will be prompted to add a title for the palette.'
}

const VIEW_PALETTES = {
  title: 'View Palettes',
  message:
    'Click to navigate to the palettes feature. This is where all saved palettes can be viewed and managed.'
}

const CLEAR_PALETTE = {
  title: 'Clear Palette',
  message:
    'Click to clear the current 64 tile palette. This will open a confirm dialog before permanently deleting tiles.'
}

const OPTIONS = {
  title: 'Options',
  message:
    'Click to open the options window. This controls various configurations within the application.'
}

const DOCUMENTATION = {
  title: 'Documentation',
  message:
    'Click to open the documentation window. This provides a detailed explanation of application features.'
}

export const COLOR_GRID = {
  title: 'Saved Color Palette',
  message:
    'Holds up to 64 colors. Right click an individual tile to access the Color Generators Menu. These actions will generate more colors based on color theory mathematics. Tiles can also be deleted from this menu.'
}

export const STAT_OUTPUT = {
  title: 'Color Stats Output',
  message:
    'Under the hood Color Tool calculates HSL, RGB and HEX color values.  Click the icon on the right to copy a value to the clipboard, then paste elsewhere as needed. If the Alpha option is set, output formats will be HSLA, RGBA and HEXA.'
}

export const STAT_INPUT = {
  title: 'Color Stats Input',
  message:
    'Manually enter values for Hue, Saturation, Lightness and optional Alpha. Input is automatically restricted to accepted values. Use the arrow buttons for fine grained control over each value.'
}

export const COLOR_BAR = {
  title: 'Color Bars',
  message:
    'Represent the Hue, Saturation, Lightness and optional Alpha value of a color. Simple click the bar or drag the handle left or right to adjust the values. Notice when the Hue is adjusted the other bars change color.'
}

export default {
  SAVE_COLOR,
  DROPPER,
  SAVE_PALETTE,
  VIEW_PALETTES,
  CLEAR_PALETTE,
  OPTIONS,
  DOCUMENTATION
}
