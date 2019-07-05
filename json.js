/* eslint-disable no-useless-escape */
function formatJson(json, options) {
  if (json === '') return ''
  let reg
  let formatted = ''
  let pad = 0
  let PADDING = '    ' // one can also use '\t' or a different number of spaces

  // optional settings
  options = options || {}
  // remove newline where '{' or '[' follows ':'
  options.newlineAfterColonIfBeforeBraceOrBracket = options.newlineAfterColonIfBeforeBraceOrBracket === true
  // use a space after a colon
  options.spaceAfterColon = options.spaceAfterColon === false

  // begin formatting...
  if (typeof json !== 'string') {
    // make sure we start with the JSON as a string
    json = JSON.stringify(json)
  } else {
    // is already a string, so parse and re-stringify in order to remove extra whitespace
    json = JSON.parse(json)
    json = JSON.stringify(json)
  }

  // add newline before and after curly braces
  reg = /([\{\}])/g
  json = json.replace(reg, '\r\n$1\r\n')

  // add newline before and after square brackets
  reg = /([\[\]])/g
  json = json.replace(reg, '\r\n$1\r\n')

  // add newline after comma
  reg = /(\,)/g
  json = json.replace(reg, '$1\r\n')

  // remove multiple newlines
  reg = /(\r\n\r\n)/g
  json = json.replace(reg, '\r\n')

  // remove newlines before commas
  reg = /\r\n\,/g
  json = json.replace(reg, ',')

  // optional formatting...
  if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
    reg = /\:\r\n\{/g
    json = json.replace(reg, ':{')
    reg = /\:\r\n\[/g
    json = json.replace(reg, ':[')
  }
  if (options.spaceAfterColon) {
    reg = /\:/g
    json = json.replace(reg, ': ')
  }

  json.split('\r\n').forEach(function (node, index) {
    let i
    let indent = 0
    let padding = ''

    if (node.match(/\{$/) || node.match(/\[$/)) {
      indent = 1
    } else if (node.match(/\}/) || node.match(/\]/)) {
      if (pad !== 0) {
        pad -= 1
      }
    } else {
      indent = 0
    }

    for (i = 0; i < pad; i++) {
      padding += PADDING
    }

    formatted += padding + node + '\r\n'
    pad += indent
  })
  return formatted
}

export default {
  formatJson
}