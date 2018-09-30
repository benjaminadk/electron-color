import React from 'react'

export default function({ barRef, thumbRef, left }) {
  return (
    <div ref={barRef} className="bar">
      <div ref={thumbRef} style={{ left: `${left}px` }} className="thumb" />
    </div>
  )
}
