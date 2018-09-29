import React from 'react'
import Typography from '@material-ui/core/Typography'
import { HSL_IMG } from 'common/image'

export default function() {
  return (
    <div>
      <Typography variant="display1" align="center">
        HSL Color Picker
      </Typography>
      <Typography variant="headline">The HSL Color Model</Typography>
      <Typography>
        HSL is the abbreviation for Hue, Saturation and Lightness and in an alternative to the HEX
        or RGB color models. The Hue value determines what color something is, based on a
        traditional color wheel, and ranges from 0 to 360 degrees. Saturation is a measure of how
        much of the given Hue is present, and ranges from 0 to 100%. The Lightness value also ranges
        from 0 to 100%, and represents a gradient from black to white.
      </Typography>
      <img src={HSL_IMG} />
      <Typography variant="headline">Basic Usage</Typography>
      <Typography>
        HSL Color Picker lets you set Hue, Saturation and Lightness by adjusting the color bars or
        by adjusting the numerical values via text input. The resulting color is displayed both
        visually and textually, in three common formats: HSL, RGB and HEX. Clicking the copy icon
        next to a numerical value will copy that value to your clipboard.
      </Typography>
    </div>
  )
}
