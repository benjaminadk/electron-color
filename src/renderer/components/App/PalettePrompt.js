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
  typoTitle: {
    marginLeft: theme.spacing.unit,
    fontSize: '.7rem'
  },
  outlinedInput: {
    width: 250,
    fontSize: '.75rem'
  },
  notchedOutline: {
    borderRadius: 0
  }
})

class PalettePrompt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: ''
    }
  }

  componentWillMount() {
    const { loadedTitle } = this.props
    loadedTitle.length && this.setState({ title: loadedTitle })
  }

  handleChange = e => this.setState({ title: e.target.value })

  handleKeyDown = e => {
    if (!this.state.title) return
    if (e.keyCode === 13) {
      this.savePalette()
    }
  }

  savePalette = () => {
    const { title } = this.state
    this.props.savePalette(title)
    this.setState({ title: '' })
    this.props.onClose()
  }

  render() {
    const { open, onClose, classes } = this.props
    const { title } = this.state
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle disableTypography>
          <Typography variant="caption" color="inherit" classes={{ root: classes.typoTitle }}>
            Save Palette
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            value={title}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            label="Enter Palette Title"
            autoFocus
            InputProps={{
              classes: {
                root: classes.outlinedInput,
                notchedOutline: classes.notchedOutline
              }
            }}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={!title} onClick={this.savePalette}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(PalettePrompt)
