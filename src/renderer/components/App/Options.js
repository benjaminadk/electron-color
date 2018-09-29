import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { remote } from 'electron'
import SwitchOption from '../Options/SwitchOption'
import OutlineOption from '../Options/OutlineOption'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({})

class Options extends Component {
  constructor(props) {
    super(props)

    this.state = {
      alpha: false,
      pinned: false,
      outlineColor: '#FF0000'
    }
  }

  componentWillMount() {
    let { alpha, pinned, outlineColor } = this.props.options
    this.setState({ alpha, pinned, outlineColor })
  }

  onAlphaChange = (e, alpha) => this.setState({ alpha })

  onPinnedChange = (e, pinned) => {
    pinned && remote.getCurrentWindow().setAlwaysOnTop(true)
    !pinned && remote.getCurrentWindow().setAlwaysOnTop(false)
    this.setState({ pinned })
  }

  onOutlineChange = e => this.setState({ outlineColor: e.target.value })

  saveOptions = () => {
    let options = {
      alpha: this.state.alpha,
      pinned: this.state.pinned,
      outlineColor: this.state.outlineColor
    }
    this.props.saveOptions(options)
    this.props.exitOptions()
  }

  render() {
    const { alpha, pinned, outlineColor } = this.state
    const { exitOptions, classes } = this.props
    return (
      <div className="Options">
        <Typography variant="title">Options</Typography>
        <div className="middle">
          <SwitchOption
            text="Add Alpha To Color Selection"
            checked={alpha}
            onChange={this.onAlphaChange}
          />
          <SwitchOption
            text="Color Picker Always On Top"
            checked={pinned}
            onChange={this.onPinnedChange}
          />
          <OutlineOption
            outlineColor={outlineColor}
            onOutlineChange={this.onOutlineChange}
          />
        </div>
        <div className="bottom">
          <Button className="button" size="small" onClick={this.saveOptions}>
            Save
          </Button>
          <Button className="button" size="small" onClick={exitOptions}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Options)
