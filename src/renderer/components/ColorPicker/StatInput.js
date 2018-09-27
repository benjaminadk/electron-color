import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown'

const styles = theme => ({
  iconButton: {
    fontSize: theme.typography.pxToRem(20),
    padding: 0,
    width: 10,
    height: 18,
    color: `rgb(0, 0, 0)`,
    '&:hover': {
      background: 'transparent'
    }
  }
})

function StatInput({ type, before, after, value, onChange, onClick, classes }) {
  return (
    <div className="stat-input">
      <span className="stat-label">{before}</span>
      <div className="stat-middle">
        <IconButton
          onClick={() => onClick(type, true)}
          classes={{ root: classes.iconButton }}
        >
          <ArrowUpIcon fontSize="inherit" />
        </IconButton>
        <input
          type="text"
          maxLength="3"
          minLength="1"
          value={value}
          onChange={e => onChange(e, type)}
        />
        <IconButton
          onClick={() => onClick(type, false)}
          classes={{ root: classes.iconButton }}
        >
          <ArrowDownIcon fontSize="inherit" />
        </IconButton>
      </div>
      <span className="stat-label">{after}</span>
    </div>
  )
}

export default withStyles(styles)(StatInput)
