import React from 'react'

export default function({ selectedIndex, index, ...rest }) {
  return (
    <div
      {...rest}
      data-index={index}
      style={{
        width: '10px',
        height: '10px',
        outline: index === selectedIndex ? '2px solid red' : 'none'
      }}
    />
  )
}
