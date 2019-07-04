/**
 * 列表转树
 * @param dataList 列表
 * @param sortFn 叶子节点排序方法
 * @returns {Array}
 */
function buildTree(dataList, sortFn, callback) {
  let idName = 'id'
  let parentIdName = 'parentId'
  let childrenListName = 'children'
  let treeMap = {}

  // 构造一个根据 id 查找节点的 Map，方便构造树
  for (let i = 0; i < dataList.length; i++) {
    let node = dataList[i]
    let id = node[idName]

    if (id) { // 过滤ID的空的节点
      treeMap[id] = node
    }
  }

  // 构造树列表
  let treeList = []

  for (let i = 0; i < dataList.length; i++) {
    let node = dataList[i]
    let parentId = node[parentIdName]

    if (callback instanceof Function) {
      callback(node)
    }

    // 判断该节点有没有父节点
    if (treeMap[parentId]) {
      let parentNode = treeMap[parentId]
      let childrenList = parentNode[childrenListName]

      if (!childrenList) {
        // 新建一个子节点列表，并放入父节点中
        childrenList = []
        parentNode[childrenListName] = childrenList
      }
      childrenList.push(node) // 加入子节点

      if (typeof sortFn === 'function') { // todo
        childrenList.sort(sortFn)
      }
    } else {
      treeList.push(node) // 加入根节点

      if (typeof sortFn === 'function') { // todo
        treeList.sort(sortFn)
      }
    }
  }

  return treeList
}

/**
 * 层次遍历树或森林（非递归）
 */
function levelOrder(node, callback) {
  if (node) {
    let stack = []
    if (node instanceof Array) { // 处理森林的情况
      stack = node
    } else {
      stack.push(node)
    }
    while (stack.length !== 0) {
      let currentNode = stack.shift()
      // 处理每个节点
      if (callback instanceof Function) {
        callback(currentNode)
      }
      let children = currentNode.children
      if (children) {
        stack = stack.concat(children)
      }
    }
  }
}

/**
 * 先序遍历树或森林（递归）
 */
function preOrder(node, callback) {
  if (node instanceof Array) { // 处理森林的情况
    for (var i = 0, len = node.length; i < len; i++) {
      this.preOrder(node[i], callback)
    }
  } else if (node) {
    // 处理每个节点
    if (callback instanceof Function) {
      callback(node)
    }
    let children = node.children
    if (children) {
      for (let i = 0, len = children.length; i < len; i++) {
        this.preOrder(children[i], callback)
      }
    }
  }
}

export default {
  buildTree,
  preOrder,
  levelOrder
}