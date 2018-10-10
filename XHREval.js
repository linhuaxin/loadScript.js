function createRequest() {
  var request
  try {
    request = new XMLHttpRequest()
  } catch (tryMS) {
    try {
      request = new ActiveXObject('Msxml2.XMLHTTP')
    } catch (otherMS) {
      try {
        request = new ActiveXObject('Microsoft.XMLHTTP')
      } catch (failed) {
        request = null
      }
    }
  }
  return request
}

var request = createRequest()
request.onreadystatechange = function () {
  if (request.readyState === 4) {
    if ((request.status >= 200 && request.status < 300) || request.status === 304) {
      eval(request.responseText)
    }
  }
}

request.open('GET', 'alert.js', true)
request.send(null)