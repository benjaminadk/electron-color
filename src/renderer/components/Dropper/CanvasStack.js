import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import Box from './Box'

const styles = theme => ({
  iconButton: {
    fontSize: theme.typography.pxToRem(18),
    padding: 0,
    width: 16,
    height: 16,
    color: `rgb(0, 0, 0)`,
    '&:hover': {
      background: 'transparent'
    }
  }
})

function CanvasStack({
  c1Ref,
  c2Ref,
  topLayerRef,
  boxIndex,
  width,
  height,
  setBoxIndex,
  shiftCanvasUp,
  shiftCanvasDown,
  shiftCanvasLeft,
  shiftCanvasRight,
  classes
}) {
  return (
    <div className="drop-canvas-wrapper">
      <IconButton
        classes={{ root: classes.iconButton }}
        onClick={shiftCanvasUp}
        disableRipple
      >
        <ArrowUpIcon fontSize="inherit" />
      </IconButton>
      <div className="canvas-stack-row">
        <IconButton
          classes={{ root: classes.iconButton }}
          onClick={shiftCanvasLeft}
          disableRipple
        >
          <ArrowLeftIcon fontSize="inherit" />
        </IconButton>
        <div className="canvas-stack">
          <canvas id="c1" ref={c1Ref} width={width} height={height} />
          <canvas id="c2" ref={c2Ref} width={width} height={height} />
          <div id="top-layer" ref={topLayerRef}>
            {[...Array(100)].map((e, i) => (
              <Box
                key={`box-${i}`}
                index={i}
                selectedIndex={boxIndex}
                onClick={() => setBoxIndex(i)}
              />
            ))}
          </div>
        </div>
        <IconButton
          classes={{ root: classes.iconButton }}
          onClick={shiftCanvasRight}
          disableRipple
        >
          <ArrowRightIcon fontSize="inherit" />
        </IconButton>
      </div>
      <IconButton
        classes={{ root: classes.iconButton }}
        onClick={shiftCanvasDown}
        disableRipple
      >
        <ArrowDownIcon fontSize="inherit" />
      </IconButton>
    </div>
  )
}

export default withStyles(styles)(CanvasStack)
