import React, { Component } from 'react'
import { remote } from 'electron'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import BackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import ColorGrid from '../ColorPicker/ColorGrid'
import getMainWinDimens from 'common/getMainWinDimens'

const [mainWidth, mainHeight, mainX, mainY] = getMainWinDimens()

const styles = theme => ({
  main: {
    width: Math.round(mainWidth),
    height: Math.round(mainHeight),
    display: 'flex'
  },
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
  list: {
    width: Math.round(mainWidth * 0.35),
    height: '100%',
    borderRight: `1px solid ${theme.palette.divider}`,
    overflowY: 'auto'
  },
  subheader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    lineHeight: '32px',
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  subText: {
    width: '100%',
    textAlign: 'center',
    marginLeft: -24
  },
  listItemRoot: {
    paddingLeft: theme.spacing.unit,
    '&$listItemSelected, &$listItemSelected:hover': {
      outline: `1px solid ${theme.palette.grey['A200']}`,
      background: theme.palette.grey[200]
    }
  },
  listItemSelected: {},
  listItemButton: {
    '&:hover': {
      background: theme.palette.grey[100]
    }
  },
  right: {
    width: Math.round(mainWidth * 0.65),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

class Palettes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: null,
      colors: null
    }
  }

  componentWillMount() {
    this.resetColors()
  }

  resetColors = () => {
    var colors = []
    for (let i = 0; i < 64; i++) {
      colors[i] = { color: 'transparent', clean: true, type: null }
    }
    this.setState({ colors })
  }

  selectPalette = i => {
    const { palettes } = this.props
    let colors = palettes[i].colors
    this.setState({ selectedIndex: i, colors })
  }

  deletePalette = (i, title) => {
    this.props.deletePalette(i, title)
    this.resetColors()
    this.setState({ selectedIndex: null })
  }

  render() {
    const { palettes, exitPalettes, classes } = this.props
    const { selectedIndex, colors } = this.state
    return (
      <div className={classes.main}>
        <List classes={{ root: classes.list }}>
          <ListSubheader disableGutters classes={{ root: classes.subheader }}>
            <IconButton
              onClick={exitPalettes}
              classes={{ root: classes.iconButton }}
            >
              <BackIcon fontSize="inherit" />
            </IconButton>
            <Typography className={classes.subText}>Palettes</Typography>
          </ListSubheader>
          {palettes &&
            palettes.map((p, i) => (
              <ListItem
                key={p.title}
                onClick={() => this.selectPalette(i)}
                selected={selectedIndex === i}
                dense
                disableGutters
                button
                classes={{
                  root: classes.listItemRoot,
                  selected: classes.listItemSelected,
                  button: classes.listItemButton
                }}
              >
                <ListItemText primary={p.title} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => this.deletePalette(i, p.title)}
                    classes={{ root: classes.iconButton }}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
        <div className={classes.right}>
          <ColorGrid colors={colors} handleSwatchClick={() => {}} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Palettes)
