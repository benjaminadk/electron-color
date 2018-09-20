import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'

const styles = theme => ({
  caption: {
    fontSize: '0.65rem'
  }
})

function ColorOutput({ color, classes }) {
  return (
    <React.Fragment>
      <div className="drop-rgb">
        <Typography
          variant="caption"
          align="center"
          classes={{
            caption: classNames({
              [classes.caption]: color && color.substr(0, 4) === 'rgba'
            })
          }}
        >
          {color ? color : 'no color'}
        </Typography>
      </div>
      <div
        className="drop-swatch"
        style={{ backgroundColor: color ? color : 'transparent' }}
      />
    </React.Fragment>
  )
}

export default withStyles(styles)(ColorOutput)
