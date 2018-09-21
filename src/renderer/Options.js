import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { remote } from 'electron'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  switch: {},
  switchBase: {
    height: 24
  }
})

class Options extends Component {
  constructor(props) {
    super(props)

    this.state = {
      alpha: false,
      pinned: false
    }
  }

  componentWillMount() {
    let { alpha, pinned } = this.props.options
    this.setState({ alpha, pinned })
  }

  onAlphaChange = (e, alpha) => this.setState({ alpha })

  onPinnedChange = (e, pinned) => {
    pinned && remote.getCurrentWindow().setAlwaysOnTop(true)
    !pinned && remote.getCurrentWindow().setAlwaysOnTop(false)
    this.setState({ pinned })
  }

  saveOptions = () => {
    let options = {
      alpha: this.state.alpha,
      pinned: this.state.pinned
    }
    this.props.saveOptions(options)
    this.props.exitOptions()
  }

  render() {
    const { alpha, pinned } = this.state
    const { exitOptions, classes } = this.props
    return (
      <div className="Options">
        <Typography variant="title">Options</Typography>
        <div className="middle">
          <FormControlLabel
            label={
              <Typography variant="caption">
                Add Alpha To Color Selection
              </Typography>
            }
            labelPlacement="start"
            control={
              <Switch
                checked={alpha}
                color="primary"
                onChange={this.onAlphaChange}
                disableRipple
                classes={{
                  root: classes.switch,
                  switchBase: classes.switchBase
                }}
              />
            }
          />
          <FormControlLabel
            label={
              <Typography variant="caption">
                Color Picker Always On Top
              </Typography>
            }
            labelPlacement="start"
            control={
              <Switch
                checked={pinned}
                color="primary"
                onChange={this.onPinnedChange}
                disableRipple
                classes={{ switchBase: classes.switchBase }}
              />
            }
          />
        </div>
        <div className="bottom">
          <Button
            className="button"
            variant="contained"
            size="small"
            onClick={this.saveOptions}
          >
            Save
          </Button>
          <Button
            className="button"
            variant="contained"
            size="small"
            onClick={exitOptions}
          >
            Cancel
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Options)
