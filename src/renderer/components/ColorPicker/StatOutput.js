import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CopyIcon from '@material-ui/icons/FileCopySharp'

const msg = 'Copied To Clipboard'

const styles = theme => ({
  iconButton: {
    fontSize: theme.typography.pxToRem(14),
    padding: 0,
    width: 18,
    height: 18,
    color: '#545959',
    '&:hover': {
      background: 'transparent'
    }
  }
})

function StatOutput({
  copied,
  alpha,
  hsl,
  hsla,
  rgb,
  rgba,
  hex,
  hexa,
  copyToClipboard,
  classes
}) {
  return (
    <div className="formats">
      <div>
        <input
          type="text"
          value={copied === 1 ? msg : alpha ? hsla : hsl}
          style={{ outline: copied === 1 && '1px solid #545959' }}
          readOnly
        />
        <IconButton
          classes={{ root: classes.iconButton }}
          onClick={() => copyToClipboard(alpha ? hsla : hsl, 1)}
          disableRipple
        >
          <CopyIcon fontSize="inherit" />
        </IconButton>
      </div>
      <div>
        <input
          type="text"
          value={copied === 2 ? msg : alpha ? rgba : rgb}
          style={{ outline: copied === 2 && '1px solid #545959' }}
          readOnly
        />
        <IconButton
          classes={{ root: classes.iconButton }}
          onClick={() => copyToClipboard(alpha ? rgba : rgb, 2)}
          disableRipple
        >
          <CopyIcon fontSize="inherit" />
        </IconButton>
      </div>
      <div>
        <input
          type="text"
          value={copied === 3 ? msg : alpha ? hexa : hex}
          style={{ outline: copied === 3 && '1px solid #545959' }}
          readOnly
        />
        <IconButton
          classes={{ root: classes.iconButton }}
          onClick={() => copyToClipboard(alpha ? hexa : hex, 3)}
          disableRipple
        >
          <CopyIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  )
}

export default withStyles(styles)(StatOutput)
