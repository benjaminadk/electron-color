import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { remote } from 'electron'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  control: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%'
  },
  iOSSwitchBase: {
    height: 30,
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: theme.palette.primary.dark
      }
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp
    })
  },
  iOSChecked: {
    transform: 'translateX(21px)',
    '& + $iOSBar': {
      opacity: 1,
      border: `1px solid ${theme.palette.primary.dark}`
    }
  },
  iOSBar: {
    borderRadius: 13,
    width: 40,
    height: 18,
    marginTop: -10,
    marginLeft: -18,
    border: `1px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[200],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
    '&:before': {
      content: '"ON"',
      display: 'inline-block',
      fontSize: '.6rem',
      color: theme.palette.common.white,
      transform: 'translate(5px,-2.5px)'
    }
  },
  iOSIcon: {
    width: 18,
    height: 18
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1]
  }
})

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
          <FormControlLabel
            classes={{ root: classes.control }}
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
                  switchBase: classes.iOSSwitchBase,
                  bar: classes.iOSBar,
                  icon: classes.iOSIcon,
                  iconChecked: classes.iOSIconChecked,
                  checked: classes.iOSChecked
                }}
              />
            }
          />
          <FormControlLabel
            classes={{ root: classes.control }}
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
                classes={{
                  switchBase: classes.iOSSwitchBase,
                  bar: classes.iOSBar,
                  icon: classes.iOSIcon,
                  iconChecked: classes.iOSIconChecked,
                  checked: classes.iOSChecked
                }}
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
