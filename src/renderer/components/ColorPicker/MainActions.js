import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import SettingsIcon from '@material-ui/icons/Settings'
import AddIcon from '@material-ui/icons/Add'
import PaletteIcon from '@material-ui/icons/Palette'
import DeleteIcon from '@material-ui/icons/Delete'
import DropperIcon from '@material-ui/icons/Colorize'
import SaveIcon from '@material-ui/icons/Save'

const styles = theme => ({
  button: {
    marginLeft: theme.spacing.unit
  }
})

class MainActions extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const {
      addNewColor,
      enterOptions,
      enterPalettes,
      enterDropper,
      savePalette,
      resetSavedColors,
      classes
    } = this.props
    const buttons = [
      { text: 'Add Color', icon: <AddIcon />, click: addNewColor },
      { text: 'Open Dropper', icon: <DropperIcon />, click: enterDropper },
      { text: 'Save Palette', icon: <SaveIcon />, click: savePalette },
      { text: 'View Palettes', icon: <PaletteIcon />, click: enterPalettes },
      { text: 'Clear Palette', icon: <DeleteIcon />, click: resetSavedColors },
      { text: 'Options', icon: <SettingsIcon />, click: enterOptions }
    ]
    return (
      <div className="actions">
        {buttons.map((b, i) => (
          <Button key={i} onClick={b.click} classes={{ root: classes.button }}>
            {b.icon}
          </Button>
        ))}
      </div>
    )
  }
}

export default withStyles(styles)(MainActions)
