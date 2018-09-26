import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'
import ColorGrid from '../ColorPicker/ColorGrid'
import getMainWinDimens from 'common/getMainWinDimens'

const [mainWidth, mainHeight, mainX, mainY] = getMainWinDimens()

const styles = theme => ({
  main: {
    width: mainWidth,
    height: mainHeight,
    display: 'flex'
  },
  list: {
    width: mainWidth * 0.35,
    height: '100%',
    borderRight: `1px solid ${theme.palette.divider}`,
    overflowY: 'auto'
  },
  subheader: {
    lineHeight: '32px',
    textAlign: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  listItemRoot: {
    paddingLeft: theme.spacing.unit
  },
  listItemSelected: {
    outline: `1px solid ${theme.palette.divider}`
  },
  right: {
    width: mainWidth * 0.65,
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

  render() {
    const { palettes, exitPalettes, classes } = this.props
    const { selectedIndex, colors } = this.state
    return (
      <div className={classes.main}>
        <List classes={{ root: classes.list }}>
          <ListSubheader classes={{ root: classes.subheader }}>
            Palettes
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
                  selected: classes.listItemSelected
                }}
              >
                <ListItemText primary={p.title} />
              </ListItem>
            ))}
        </List>
        <div className={classes.right}>
          <ColorGrid colors={colors} handleSwatchClick={() => {}} />
          <Button onClick={exitPalettes}>Back To Color Picker</Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Palettes)
