import React from 'react'
import Button from '@material-ui/core/Button'

export default function({ addNewColor, enterOptions, resetSavedColors }) {
  return (
    <div className="actions">
      <Button onClick={addNewColor} disableRipple disableFocusRipple>
        Save Color
      </Button>
      <Button onClick={resetSavedColors} disableRipple disableFocusRipple>
        Discard Saved Colors
      </Button>
    </div>
  )
}
