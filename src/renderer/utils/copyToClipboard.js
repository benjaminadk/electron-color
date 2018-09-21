export default function(text) {
  let range = document.createRange()
  let selection = document.getSelection()
  let x = document.createElement('span')
  x.textContent = text
  document.body.appendChild(x)
  range.selectNode(x)
  selection.addRange(range)
  document.execCommand('copy')
  document.body.removeChild(x)
}
