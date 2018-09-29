import { screen } from 'electron'

const inDev = process.env.NODE_ENV === 'development'

export default function() {
  const { width, height } = screen.getPrimaryDisplay().size
  let mainWidth = Math.round(width * 0.5)
  let mainHeight = inDev ? Math.round(height * 0.65) : Math.round(height * 0.6)
  let mainX = width - mainWidth
  let mainY = 0
  return [mainWidth, mainHeight, mainX, mainY]
}
