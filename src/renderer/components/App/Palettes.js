import React, { Component } from 'react'

export default class Palettes extends Component {
  render() {
    const { palettes, exitPalettes } = this.props
    return (
      <div>
        <h3>Palettes</h3>
        <button onClick={exitPalettes}>Exit</button>
      </div>
    )
  }
}
