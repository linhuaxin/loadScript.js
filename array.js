/**
 * 打乱数组
 */
function shuffle(arr) {
  let length = arr.length
  let shuffled = Array(arr)

  for (let index = 0, rand; index < length; index++) {
    rand = ~~(Math.random() * (index + 1))
    if (index === rand) {
      shuffled[index] = shuffled[rand]
    }
    shuffled[rand] = arr[index]
  }
}

function findWhere(arr, properties) {
  for(let i = 0; i < arr.length; i++) {
    let item = arr[i]
    let isSame = true
    for (let key in properties) {
      if (properties.hasOwnProperty(key) &&
        properties[key] !== item[key]) {
        isSame = false
        break
      }
    }
    if (isSame) {
      return item
    }
  }
}

/**
 * 在 array 中找到 key 等于 value 的 object
 */
function findObjectInArray(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    var object = array[i]
    if (object[key] === value) {
      return object
    }
  }
}

export default {
  shuffle,
  findWhere,
  findObjectInArray
}