import React from 'react'

export default function({ alpha, hsl, hsla, rgb, rgba, hex, hexa }) {
  return (
    <div className="formats">
      <input type="text" value={alpha ? hsla : hsl} readOnly />
      <input type="text" value={alpha ? rgba : rgb} readOnly />
      <input type="text" value={alpha ? hexa : hex} readOnly />
    </div>
  )
}
