/**
 * 获取文本显示宽度
 */
function getVisualWidth(str) {
  let visualWidth
  if (!str) {
    visualWidth = 0
  } else {
    let $text = $('<span style="display: none">' + str + '</span>').appendTo('body')
    visualWidth = $text.width()
    $text.remove()
  }
  return visualWidth
}

export default {
  getVisualWidth
}