import { screen } from 'electron'

export default function() {
  const { width, height } = screen.getPrimaryDisplay().size
  let mainWidth = Math.round(width * 0.5)
  let mainHeight = Math.round(height * 0.6)
  let mainX = width - mainWidth
  let mainY = 0
  return [mainWidth, mainHeight, mainX, mainY]
}
