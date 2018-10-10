function dynamicScriptElement(url, callback) {
  var script = document.createElement('script')
  script.type = 'text/javascript'

  if (script.readyState) { // IE
    script.onreadystatechange = function() {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null
        callback()
      } else { // Others
        script.onload = function() {
          callback()
        }
      }
    }
  }
  script.src = url
  document.getElementsByTagName('head')[0].appendChild(script)
}

// 严格确保 A -> B -> C，依次下载脚本文件
dynamicScriptElement('A.js', function() {
  dynamicScriptElement('B.js', function() {
    dynamicScriptElement('C.js', function() {
      console.log('All files are loaded')
    })
  })
})