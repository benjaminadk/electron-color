import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  dialog: {
    borderRadius: 0,
    boxShadow: theme.shadows[1],
    border: `1px solid ${theme.palette.primary.main}`
  },
  dialogTitle: {
    height: 25,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    padding: 0
  },
  typoTitle: {
    marginLeft: theme.spacing.unit,
    fontSize: '.7rem'
  }
})

function PalettePrompt({ open, onClose, classes }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.dialog }}
      BackdropProps={{ invisible: true }}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle classes={{ root: classes.dialogTitle }} disableTypography>
        <Typography
          variant="caption"
          color="inherit"
          classes={{ root: classes.typoTitle }}
        >
          Save Palette
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Enter a Title for your Palette</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(PalettePrompt)
