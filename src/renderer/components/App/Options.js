import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { remote } from 'electron'
import SwitchOption from '../Options/SwitchOption'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
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
  },
  outline: {
    width: '35%'
  },
  select: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&:focus': {
      backgroundColor: 'transparent'
    }
  },
  listitemText: {
    paddingLeft: 6,
    paddingRight: 6
  }
})

const outlineColors = [
  { color: '#FF0000', label: 'Red' },
  { color: '#00FF00', label: 'Green' },
  { color: '#0000FF', label: 'Blue' },
  { color: '#FFFF00', label: 'Yellow' }
]

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
          <div className="outline-color">
            <Typography variant="caption">
              Dropper Pixel Outline Color
            </Typography>
            <FormControl classes={{ root: classes.outline }}>
              <Select
                value={outlineColor}
                onChange={this.onOutlineChange}
                input={<Input id="outline-color" disableUnderline />}
                classes={{ select: classes.select }}
              >
                {outlineColors.map((o, i) => (
                  <MenuItem key={o.label} value={o.color} disableGutters dense>
                    <Avatar
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: o.color
                      }}
                    />
                    <ListItemText
                      secondary={o.label}
                      classes={{ root: classes.listitemText }}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
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
