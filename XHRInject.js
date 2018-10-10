var script = document.createElement('script')
script.type = 'text/javascript'
script.text = request.responseText
document.body.appendChild(script)