import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  button: {
    borderRadius: 0,
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
    color: 'black',
    outline: '1px outset rgb(206, 206, 206)',
    fontSize: '.75rem',
    '&:hover': {
      backgroundColor: theme.palette.background.default,
      outline: '2px outset rgb(206, 206, 206)'
    }
  }
})

function MainAction({ addNewColor, enterOptions, resetSavedColors, classes }) {
  return (
    <div className="actions">
      <Button
        variant="contained"
        onClick={addNewColor}
        disableRipple
        disableFocusRipple
        classes={{ root: classes.button }}
      >
        Save Color
      </Button>
    </div>
  )
}

export default withStyles(styles)(MainAction)
