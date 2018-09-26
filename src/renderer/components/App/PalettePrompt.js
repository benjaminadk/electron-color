import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  dialog: {
    width: '50%',
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
  },
  dialogContent: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 2,
    paddingTop: 10
  },
  outlinedInput: {
    width: 250,
    fontSize: '.75rem'
  },
  notchedOutline: {
    borderRadius: 0
  },
  button: {
    borderRadius: 0,
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
    color: 'black',
    outline: '1px outset rgb(206, 206, 206)',
    fontSize: '.8rem',
    '&:hover': {
      backgroundColor: theme.palette.background.default,
      outline: '2px outset rgb(206, 206, 206)'
    }
  }
})

class PalettePrompt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      error: false
    }
  }

  handleChange = e => this.setState({ title: e.target.value, error: false })

  savePalette = () => {
    const { title } = this.state
    var success = this.props.savePalette(title)
    if (success) {
      this.setState({ title: '' })
      this.props.onClose()
    } else {
      this.setState({ error: true })
    }
  }

  render() {
    const { open, onClose, classes } = this.props
    const { title, error } = this.state
    return (
      <Dialog
        open={open}
        onClose={onClose}
        BackdropProps={{ invisible: true }}
        disableBackdropClick
        disableEscapeKeyDown
        classes={{ paper: classes.dialog }}
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
        <DialogContent classes={{ root: classes.dialogContent }}>
          <TextField
            variant="outlined"
            value={title}
            onChange={this.handleChange}
            label={
              error ? 'Error: Duplicate Palette Title' : 'Enter Palette Title'
            }
            autoFocus
            InputProps={{
              classes: {
                root: classes.outlinedInput,
                notchedOutline: classes.notchedOutline
              }
            }}
            InputLabelProps={{ shrink: true }}
            error={error}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!title}
            classes={{ root: classes.button }}
            onClick={this.savePalette}
            disableRipple
          >
            Save
          </Button>
          <Button
            classes={{ root: classes.button }}
            onClick={onClose}
            disableRipple
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(PalettePrompt)
