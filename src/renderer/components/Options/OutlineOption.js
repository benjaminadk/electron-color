import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'

const outlineColors = [
  { color: '#FF0000', label: 'Red' },
  { color: '#00FF00', label: 'Green' },
  { color: '#0000FF', label: 'Blue' },
  { color: '#FFFF00', label: 'Yellow' }
]

const styles = theme => ({
  outline: {
    width: '35%'
  },
  select: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&:focus': {
      backgroundColor: 'transparent'
    }
  },
  listitemText: {
    paddingLeft: 6,
    paddingRight: 6
  }
})

function OutlineOption({ outlineColor, onOutlineChange, classes }) {
  return (
    <div className="outline-color">
      <Typography variant="caption">Dropper Pixel Outline Color</Typography>
      <FormControl classes={{ root: classes.outline }}>
        <Select
          value={outlineColor}
          onChange={onOutlineChange}
          input={<Input id="outline-color" disableUnderline />}
          classes={{ select: classes.select }}
        >
          {outlineColors.map((o, i) => (
            <MenuItem key={o.label} value={o.color} disableGutters dense>
              <Avatar
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: o.color
                }}
              />
              <ListItemText
                secondary={o.label}
                classes={{ root: classes.listitemText }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default withStyles(styles)(OutlineOption)
