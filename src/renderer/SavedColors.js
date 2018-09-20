import React, { Component } from 'react'

export default class SavedColors extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { colors, handleSwatchClick } = this.props
    return (
      <div className="SavedColors">
        {colors &&
          colors.map((c, i) => (
            <div
              key={`color-${i}`}
              className="outerSwatch"
              title={c.clean ? 'none' : c.color}
              onClick={() => handleSwatchClick(c.clean ? 'none' : c)}
            >
              <div
                style={{ backgroundColor: c.color }}
                className="innerSwatch"
              />
            </div>
          ))}
      </div>
    )
  }
}
