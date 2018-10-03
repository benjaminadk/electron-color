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

const createTheme = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: getMainColor()
      }
    }
  })
  return createMuiTheme({
    props: {
      MuiButtonBase: {
        disableRipple: true
      },
      MuiDialog: {
        BackdropProps: {
          invisible: true
        },
        disableBackdropClick: true,
        disableEscapeKeyDown: true
      },
      MuiTooltip: {
        enterDelay: 1000,
        leaveDelay: 250,
        TransitionProps: { timeout: 250 }
      }
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: 0,
          boxShadow: theme.shadows[0],
          backgroundColor: theme.palette.background.default,
          color: theme.palette.common.black,
          outline: '1px outset rgb(206, 206, 206)',
          fontSize: '.75rem',
          '&:hover': {
            backgroundColor: theme.palette.background.default,
            outline: '2px outset rgb(206, 206, 206)'
          }
        }
      },
      MuiDialog: {
        paper: {
          width: '50%',
          borderRadius: 0,
          boxShadow: theme.shadows[1],
          border: `1px solid ${theme.palette.primary.main}`
        }
      },
      MuiDialogTitle: {
        root: {
          height: 25,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.getContrastText(theme.palette.primary.main),
          padding: 0
        }
      },
      MuiDialogContent: {
        root: {
          display: 'flex',
          justifyContent: 'center',
          marginTop: theme.spacing.unit * 2,
          paddingTop: 10
        }
      },
      MuiTooltip: {
        popper: {
          opacity: 1
        },
        tooltip: {
          backgroundColor: theme.palette.grey[100],
          outline: '2px outset rgb(206, 206, 206)',
          borderRadius: 0,
          color: theme.palette.common.black,
          boxShadow: theme.shadows[10]
        }
      }
    },
    palette: {
      primary: {
        main: getMainColor()
      }
    }
  })
}

const THEME = createTheme()

render(
  <MuiThemeProvider theme={THEME}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('app')
)
