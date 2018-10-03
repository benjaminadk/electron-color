import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CopyIcon from '@material-ui/icons/FileCopySharp'

const msg = 'Copied To Clipboard'
const tooltip = {
  title: 'Color Stats Output',
  message:
    'Under the hood Color Tool calculates HSL, RGB and HEX color values.  Click the icon on the right to copy a value to the clipboard, then paste elsewhere as needed. If the Alpha option is set, output formats will be HSLA, RGBA and HEXA'
}

const styles = theme => ({
  iconButton: {
    fontSize: theme.typography.pxToRem(14),
    padding: 0,
    width: 18,
    height: 18,
    color: theme.palette.grey[900],
    '&:hover': {
      background: 'transparent'
    }
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

function StatOutput({
  copied,
  alpha,
  helpers,
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
    <Tooltip
      enterDelay={1000}
      leaveDelay={250}
      placement="top"
      TransitionProps={{ timeout: 250 }}
      classes={{ popper: classes.popper, tooltip: classes.tooltip }}
      title={
        helpers ? (
          <div>
            <Typography variant="body1" color="inherit">
              {tooltip.title}
            </Typography>
            <Typography variant="caption" color="inherit" classes={{ caption: classes.caption }}>
              {tooltip.message}
            </Typography>
          </div>
        ) : (
          ''
        )
      }
    >
      <div className="formats">
        <div>
          <input
            type="text"
            value={copied === 1 ? msg : alpha ? hsla : hsl}
            style={{ outline: copied === 1 && `1px solid ${hex}` }}
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
            style={{ outline: copied === 2 && `1px solid ${hex}` }}
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
            style={{ outline: copied === 3 && `1px solid ${hex}` }}
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
    </Tooltip>
  )
}

export default withStyles(styles)(StatOutput)
