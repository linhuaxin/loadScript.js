/**
 * 浮点数相加，不丢失精度
 */
function doubleAdd() {
  let sum = 0
  for (let i = 0; i < arguments.length; i++) {
    let num = arguments[i]
    let maxLen = Math.max(dicimalLength(sum), dicimalLength(num))
    let multiple = Math.pow(10, maxLen)

    sum = (Math.floor(sum * multiple) + Math.floor(num * multiple)) / multiple
  }

  return sum
}

/**
 * @return 小数位数
 */
function dicimalLength(num) {
  let numStr = '' + num
  if (numStr.indexOf('.') === -1) {
    return 0
  } else {
    return numStr.split('.')[1].length
  }
}

function toFloat(val) {
  if (typeof val === 'string') {
    val = val.trim()
  }
  if (!val) {
    return 0
  }
  return parseFloat(val)
}

function toInt(val) {
  if (typeof val === 'string') {
    val = val.trim()
  }
  if (!val) {
    return 0
  }
  return parseInt(val)
}

export default {
  doubleAdd,
  toFloat,
  toInt
}