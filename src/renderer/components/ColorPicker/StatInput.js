import React from 'react'

export default function({ type, before, after, value, onChange }) {
  return (
    <div className="stat-input">
      <span className="stat-label">{before}</span>
      <input
        type="text"
        maxLength="3"
        minLength="1"
        value={value}
        onChange={e => onChange(e, type)}
      />
      <span className="stat-label">{after}</span>
    </div>
  )
}
