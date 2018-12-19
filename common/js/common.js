function isMobileFn() {
  return /Android|webOS|iPhone|iPod|iPad|BlackBerry|Windows Phone/i.test(navigator.userAgent)
}

function setViewport(noScale) {
  window.isMobile = isMobileFn()
  // canScale用来应付特殊情况
  var scale = window.isMobile && !noScale ? window.devicePixelRatio || 1 : 1
  var content = 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'

  document.documentElement.style.fontSize = 625 * scale + '%'
  window.rootFootSize = { value: 100 * scale, unit: 'px/rem' }
  if (scale !== 1) {
    var s = 1 / scale
    content = 'width=device-width, initial-scale=' + s + ', minimum-scale=' + s + ', maximum-scale=' + s + ', user-scalable=no'
  }
  var meta = document.createElement('meta')
  meta.setAttribute('name', 'viewport')
  meta.setAttribute('content', content)
  document.head.appendChild(meta)
}

function getEl(selector) {
  return document.querySelectorAll(selector)
}

setViewport(/noScale/i.test(location.href))
