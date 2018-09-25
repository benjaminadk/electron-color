import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  root: {
    borderRadius: 0
  }
})

function PalettePrompt({ open, onClose, classes }) {
  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.root }}>
      <DialogTitle>Save Palette</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter a Title for your Palette</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>Save</Button>
        <Button>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(PalettePrompt)
