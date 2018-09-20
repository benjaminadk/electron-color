import { screen } from 'electron'

export default function() {
  const { width, height } = screen.getPrimaryDisplay().size
  let mainWidth = width * 0.5
  let mainHeight = height * 0.52
  let mainX = width - mainWidth
  let mainY = 0
  return [mainWidth, mainHeight, mainX, mainY]
}
