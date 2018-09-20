import React from 'react'

export default function({ alpha, hsl, hsla }) {
  return (
    <div className="main-swatch">
      <div className="hsl" style={{ backgroundColor: hsl }} />
      <div
        className="hsla"
        style={{
          backgroundColor: alpha ? hsla : hsl
        }}
      >
        <span>Alpha</span>
      </div>
    </div>
  )
}
