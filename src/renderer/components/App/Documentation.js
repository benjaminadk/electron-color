import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import CopyIcon from '@material-ui/icons/FileCopySharp'
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'
import PaletteIcon from '@material-ui/icons/Palette'
import { HSL_IMG } from 'common/image'

const styles = theme => ({
  iconButton: {
    fontSize: theme.typography.pxToRem(18),
    padding: 0,
    width: 24,
    height: 24,
    color: theme.palette.text.secondary,
    '&:hover': {
      background: 'transparent'
    }
  },
  title: {
    width: '100%',
    marginLeft: '-24px',
    textAlign: 'center'
  },
  text: {
    fontSize: '.8rem'
  }
})

function Documentation({ height, exitDocs, classes }) {
  return (
    <div style={{ height }} className="Documentation">
      <div className="top">
        <IconButton onClick={exitDocs} classes={{ root: classes.iconButton }}>
          <ArrowBack fontSize="inherit" />
        </IconButton>
        <Typography classes={{ root: classes.title }} variant="display1">
          HSL Color Picker
        </Typography>
      </div>
      <div className="hsl-chart">
        <img src={HSL_IMG} />
      </div>
      <Typography variant="headline" className="header">
        The HSL Color Model
      </Typography>
      <Typography classes={{ body1: classes.text }} align="justify">
        HSL is the abbreviation for Hue, Saturation and Lightness and in an alternative to the HEX
        or RGB color models. The Hue value determines what color something is, based on a
        traditional color wheel, and ranges from 0 to 360 degrees. Saturation is a measure of how
        much of the given Hue is present, and ranges from 0 to 100%. The Lightness value also ranges
        from 0 to 100%, and represents a gradient from black to white.
      </Typography>
      <Typography variant="headline" className="header">
        Basic Usage
      </Typography>
      <Typography classes={{ body1: classes.text }} align="justify">
        HSL Color Picker lets you set Hue, Saturation and Lightness by adjusting the color bars or
        by adjusting the numerical values via text input. The resulting color is displayed both
        visually and textually, in three common formats: HSL, RGB and HEX. Clicking the copy icon{' '}
        <CopyIcon fontSize="inherit" /> next to a numerical value will copy that value to your
        clipboard.
      </Typography>
      <Typography variant="headline" className="header">
        Saving Colors
      </Typography>
      <Typography classes={{ body1: classes.text }} align="justify">
        Save a color to your palette by clicking the <AddIcon fontSize="inherit" /> button. The
        saved color will appear in the first available open tile of palette. A palette can hold 64
        total saved colors. Palettes can also be saved by clicking the{' '}
        <SaveIcon fontSize="inherit" /> button, after which, a dialog will open where a title can be
        entered. View saved palettes by clicking the <PaletteIcon fontSize="inherit" /> button.
      </Typography>
    </div>
  )
}

export default withStyles(styles)(Documentation)
