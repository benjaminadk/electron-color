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
import LoadIcon from '@material-ui/icons/Apps'
import ColorGrid from '../ColorPicker/ColorGrid'
import StatOutput from '../ColorPicker/StatOutput'
import getMainWinDimens from 'common/getMainWinDimens'
import toHSLParts from '../../utils/toHSLParts'
import toHSLString from '../../utils/toHSLString'
import HSLtoRGBorHEX from '../../utils/HSLtoRGBorHEX'
import HSLAtoRGBAorHEXA from '../../utils/HSLAtoRGBAorHEXA'

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
    maxHeight: Math.round(mainHeight - 100),
    borderRight: `1px solid ${theme.palette.divider}`,
    overflowY: 'auto'
  },
  listPadding: {
    paddingTop: 0,
    paddingBottom: 10
  },
  subheader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    lineHeight: '32px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.common.white,
    paddingTop: 4,
    zIndex: 2
  },
  subText: {
    width: '100%',
    textAlign: 'center',
    marginLeft: -24
  },
  listItemRoot: {
    paddingLeft: theme.spacing.unit,
    '&$listItemSelected, &$listItemSelected:hover': {
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
      colors: null,
      h: 0,
      s: 0,
      l: 0,
      a: 0
    }
  }

  componentWillMount() {
    this.resetColors()
  }

  resetColors = () => {
    var colors = []
    for (let i = 0; i < 64; i++) {
      colors[i] = { color: 'transparent', clean: true }
    }
    this.setState({ colors })
  }

  selectPalette = i => {
    const { palettes } = this.props
    let colors = palettes[i].colors
    this.setState({ selectedIndex: i, colors })
  }

  loadPalette = () => {
    const { selectedIndex, colors } = this.state
    if (!Number.isInteger(selectedIndex)) return
    this.props.loadPalette(colors)
  }

  deletePalette = (i, title) => {
    this.props.deletePalette(i, title)
    this.resetColors()
    this.setState({ selectedIndex: null })
  }

  deleteColor = i => {
    const { colors, selectedIndex } = this.state
    let newColors = colors.filter((c, index) => index !== i)
    newColors.push({ color: 'transparent', clean: true })
    this.setState({ colors: newColors })
    this.props.updatePalette(selectedIndex, newColors)
  }

  handleContextMenu = (e, c, i) => {
    e.preventDefault()
    if (c.clean) return
    const template = [
      { label: 'Delete Color', click: () => this.deleteColor(i) }
    ]
    const menu = remote.Menu.buildFromTemplate(template)
    menu.popup({ window: remote.getCurrentWindow() })
  }

  handleSwatchClick = c => {
    if (c === 'none') return
    var [bool, h, s, l, a] = toHSLParts(c.color)
    this.setState({ h, s, l, a })
  }

  render() {
    const { palettes, exitPalettes, classes } = this.props
    const { selectedIndex, colors, h, s, l, a } = this.state
    const hsl = toHSLString(false, h, s, l, a)
    const hsla = toHSLString(true, h, s, l, a)
    const rgb = HSLtoRGBorHEX(h, s, l, true)
    const rgba = HSLAtoRGBAorHEXA(h, s, l, a, true)
    const hex = HSLtoRGBorHEX(h, s, l, false)
    const hexa = HSLAtoRGBAorHEXA(h, s, l, a, false)
    return (
      <div className={classes.main}>
        <List classes={{ root: classes.list, padding: classes.listPadding }}>
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
                    onClick={this.loadPalette}
                    classes={{ root: classes.iconButton }}
                  >
                    <LoadIcon fontSize="inherit" />
                  </IconButton>
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
          <ColorGrid
            colors={colors}
            handleContextMenu={this.handleContextMenu}
            handleSwatchClick={this.handleSwatchClick}
          />
          <div>
            <StatOutput
              hsl={hsl}
              hsla={hsla}
              rgb={rgb}
              rgba={rgba}
              hex={hex}
              hexa={hexa}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Palettes)
