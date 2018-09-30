import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  typoTitle: {
    marginLeft: theme.spacing.unit,
    fontSize: '.7rem'
  }
})

function ConfirmPrompt({ open, title, message, onOkay, onClose, classes }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle disableTypography>
        <Typography variant="caption" color="inherit" classes={{ root: classes.typoTitle }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onOkay}>Ok</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(ConfirmPrompt)
