import React from 'react'

export default function({ colors, handleContextMenu, handleSwatchClick }) {
  return (
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
  )
}
