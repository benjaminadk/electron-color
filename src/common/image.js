import path from 'path'
import { nativeImage } from 'electron'

export const HSL_IMG = nativeImage.createFromPath(path.join(__static, '/hsl-chart.png')).toDataURL()
