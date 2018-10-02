import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CheckIcon from '@material-ui/icons/CheckCircle'
import RefreshIcon from '@material-ui/icons/Autorenew'
import CancelIcon from '@material-ui/icons/Cancel'
import GradientIcon from '@material-ui/icons/Gradient'

const styles = theme => ({
  iconButton: {
    fontSize: theme.typography.pxToRem(18),
    padding: 0,
    width: 24,
    height: 24,
    color: `rgb(0, 0, 0)`,
    '&:hover': {
      background: 'transparent'
    }
  }
})

function IconBar({ selectColor, refresh, analyzePixels, exit, classes }) {
  return (
    <div className="drop-controls">
      <IconButton classes={{ root: classes.iconButton }} disableRipple onClick={selectColor}>
        <CheckIcon fontSize="inherit" />
      </IconButton>
      <IconButton classes={{ root: classes.iconButton }} disableRipple onClick={refresh}>
        <RefreshIcon fontSize="inherit" />
      </IconButton>
      <IconButton classes={{ root: classes.iconButton }} disableRipple onClick={analyzePixels}>
        <GradientIcon fontSize="inherit" />
      </IconButton>
      <IconButton classes={{ root: classes.iconButton }} disableRipple onClick={exit}>
        <CancelIcon fontSize="inherit" />
      </IconButton>
    </div>
  )
}

export default withStyles(styles)(IconBar)
