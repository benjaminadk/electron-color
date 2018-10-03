import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  caption: {
    fontSize: '.7rem',
    lineHeight: '1.25em'
  }
})

function Helper({ tooltip, placement, helpers, children, classes }) {
  return (
    <Tooltip
      placement={placement}
      title={
        helpers ? (
          <div>
            <Typography variant="body1" color="inherit">
              {tooltip.title}
            </Typography>
            <Typography
              variant="caption"
              color="inherit"
              align="justify"
              classes={{ caption: classes.caption }}
            >
              {tooltip.message}
            </Typography>
          </div>
        ) : (
          ''
        )
      }
    >
      {children}
    </Tooltip>
  )
}

export default withStyles(styles)(Helper)
