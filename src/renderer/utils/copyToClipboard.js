export default function(text) {
  var range, selection, x
  range = document.createRange()
  selection = document.getSelection()
  x = document.createElement('span')
  x.textContent = text
  document.body.appendChild(x)
  range.selectNode(x)
  selection.addRange(range)
  document.execCommand('copy')
  x.remove()
  selection.removeRange(range)
  selection.removeAllRanges()
}
