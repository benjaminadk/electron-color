import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import SettingsIcon from '@material-ui/icons/Settings'
import AddIcon from '@material-ui/icons/Add'
import PaletteIcon from '@material-ui/icons/Palette'
import DeleteIcon from '@material-ui/icons/Delete'
import DropperIcon from '@material-ui/icons/Colorize'
import SaveIcon from '@material-ui/icons/Save'
import HelpIcon from '@material-ui/icons/Help'
import tooltips from 'common/tooltips'

const styles = theme => ({
  button: {
    marginLeft: theme.spacing.unit
  },
  popper: {
    opacity: 1
  },
  tooltip: {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.common.black}`,
    borderRadius: 0,
    color: theme.palette.common.black
  },
  caption: {
    fontSize: '.7rem',
    lineHeight: '1.25em'
  }
})

class MainActions extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const {
      helpers,
      addNewColor,
      enterOptions,
      enterPalettes,
      enterDropper,
      enterDocs,
      savePalette,
      resetSavedColors,
      classes
    } = this.props
    const buttons = [
      { text: 'SAVE_COLOR', icon: <AddIcon />, click: addNewColor },
      { text: 'DROPPER', icon: <DropperIcon />, click: enterDropper },
      { text: 'SAVE_PALETTE', icon: <SaveIcon />, click: savePalette },
      { text: 'VIEW_PALETTES', icon: <PaletteIcon />, click: enterPalettes },
      { text: 'CLEAR_PALETTE', icon: <DeleteIcon />, click: resetSavedColors },
      { text: 'OPTIONS', icon: <SettingsIcon />, click: enterOptions },
      { text: 'DOCUMENTATION', icon: <HelpIcon />, click: enterDocs }
    ]
    return (
      <div className="actions">
        {buttons.map((b, i) => (
          <Tooltip
            key={b.text}
            enterDelay={1000}
            leaveDelay={250}
            placement="top"
            TransitionProps={{ timeout: 250 }}
            classes={{ popper: classes.popper, tooltip: classes.tooltip }}
            title={
              helpers ? (
                <div>
                  <Typography variant="body1" color="inherit">
                    {tooltips[b.text].title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="inherit"
                    classes={{ caption: classes.caption }}
                  >
                    {tooltips[b.text].message}
                  </Typography>
                </div>
              ) : (
                ''
              )
            }
          >
            <Button onClick={b.click} classes={{ root: classes.button }}>
              {b.icon}
            </Button>
          </Tooltip>
        ))}
      </div>
    )
  }
}

export default withStyles(styles)(MainActions)
