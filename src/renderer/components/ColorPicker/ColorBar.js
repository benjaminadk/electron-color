import React from 'react'

export default function({ barRef, thumbRef, title, left }) {
  return (
    <div ref={barRef} className="bar" title={title}>
      <div ref={thumbRef} style={{ left: `${left}px` }} className="thumb" />
    </div>
  )
}
