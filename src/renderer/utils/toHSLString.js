export default function(hsl, h, s, l, a) {
  if (hsl) {
    return `hsl(${h},${s}%,${l}%)`
  } else {
    return `hsla(${h},${s}%,${l}%,${(a * 0.01).toFixed(2)})`
  }
}
