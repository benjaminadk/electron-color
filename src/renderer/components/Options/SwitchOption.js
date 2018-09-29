import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  control: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%'
  },
  iOSSwitchBase: {
    height: 30,
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: theme.palette.primary.dark
      }
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp
    })
  },
  iOSChecked: {
    transform: 'translateX(21px)',
    '& + $iOSBar': {
      opacity: 1,
      border: `1px solid ${theme.palette.primary.dark}`
    }
  },
  iOSBar: {
    borderRadius: 13,
    width: 40,
    height: 18,
    marginTop: -10,
    marginLeft: -18,
    border: `1px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[200],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
    '&:before': {
      content: '"ON"',
      display: 'inline-block',
      fontSize: '.6rem',
      color: theme.palette.common.white,
      transform: 'translate(5px,-2.5px)'
    }
  },
  iOSIcon: {
    width: 18,
    height: 18
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1]
  }
})

function SwitchOption({ text, checked, onChange, classes }) {
  return (
    <FormControlLabel
      classes={{ root: classes.control }}
      label={<Typography variant="caption">{text}</Typography>}
      labelPlacement="start"
      control={
        <Switch
          checked={checked}
          color="primary"
          onChange={onChange}
          disableRipple
          classes={{
            switchBase: classes.iOSSwitchBase,
            bar: classes.iOSBar,
            icon: classes.iOSIcon,
            iconChecked: classes.iOSIconChecked,
            checked: classes.iOSChecked
          }}
        />
      }
    />
  )
}

export default withStyles(styles)(SwitchOption)
