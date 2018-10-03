import React from 'react'
import Helper from '../App/Helper'
import { COLOR_GRID } from 'common/tooltips'

export default function({ colors, helpers, handleContextMenu, handleSwatchClick }) {
  return (
    <Helper tooltip={COLOR_GRID} placement="left" helpers={helpers}>
      <div className="SavedColors">
        {colors &&
          colors.map((c, i) => (
            <div
              key={`color-${i}`}
              className="outerSwatch"
              onClick={() => handleSwatchClick(c.clean ? 'none' : c)}
              onContextMenu={e => handleContextMenu(e, c, i)}
            >
              <div style={{ backgroundColor: c.color }} className="innerSwatch" />
            </div>
          ))}
      </div>
    </Helper>
  )
}
