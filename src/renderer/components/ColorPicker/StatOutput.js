import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import CopyIcon from '@material-ui/icons/FileCopySharp'

const styles = theme => ({
  iconButton: {
    fontSize: theme.typography.pxToRem(16),
    padding: 0,
    width: 18,
    height: 18,
    color: '#545959',
    '&:hover': {
      background: 'transparent'
    }
  }
})

function StatOutput({ alpha, hsl, hsla, rgb, rgba, hex, hexa, classes }) {
  return (
    <div className="formats">
      <div>
        <input type="text" value={alpha ? hsla : hsl} readOnly />
        <Tooltip title="Copy" placement="right-end" enterDelay={2000}>
          <IconButton classes={{ root: classes.iconButton }} disableRipple>
            <CopyIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </div>

      <input type="text" value={alpha ? rgba : rgb} readOnly />
      <input type="text" value={alpha ? hexa : hex} readOnly />
    </div>
  )
}

export default withStyles(styles)(StatOutput)
