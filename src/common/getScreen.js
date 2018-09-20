import { screen } from 'electron'

export default function() {
  const { width, height } = screen.getPrimaryDisplay().size
  return [width, height]
}
