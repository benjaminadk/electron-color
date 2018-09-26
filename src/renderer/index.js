import React from 'react'
import { render } from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { remote } from 'electron'
import App from './App'
import './style/index.scss'

function getMainColor() {
  let color = remote.systemPreferences.getAccentColor()
  return `#${color.substr(0, 6)}`
}

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
        boxShadow: 'none',
        backgroundColor: '#fafafa',
        color: 'black',
        outline: '1px outset rgb(206, 206, 206)',
        fontSize: '.75rem',
        '&:hover': {
          backgroundColor: '#fafafa',
          outline: '2px outset rgb(206, 206, 206)'
        }
      }
    }
  },
  palette: {
    primary: {
      main: getMainColor()
    }
  }
})

render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('app')
)
