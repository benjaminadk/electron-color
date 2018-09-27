export default function(color) {
  var hsl, h, s, l, a, bool
  hsl = color.replace(/[^\d,]/g, '').split(',')
  bool = hsl.length > 3
  h = hsl[0]
  s = hsl[1]
  l = hsl[2]
  a = bool ? parseInt(hsl[3], 10) : 100
  return [bool, h, s, l, a]
}
