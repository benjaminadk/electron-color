import React, { Component } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

export default class Options extends Component {
  constructor(props) {
    super(props)

    this.state = {
      alpha: false
    }
  }

  componentWillMount() {
    let { alpha } = this.props.options
    this.setState({ alpha })
  }

  onAlphaChange = (e, alpha) => this.setState({ alpha })

  saveOptions = () => {
    let options = {
      alpha: this.state.alpha
    }
    this.props.saveOptions(options)
    this.props.exitOptions()
  }

  render() {
    const { alpha } = this.state
    const { exitOptions } = this.props
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
