function isMobile() {
  return /Android|webOS|iPhone|iPod|iPad|BlackBerry|Windows Phone/i.test(navigator.userAgent)
}

function scale(noScale) {
  // canScale用来应付特殊情况
  if (isMobile()) { // 判断访问环境是 Android|webOS|iPhone|iPod|BlackBerry(移动端)
    var scale = window.devicePixelRatio || 1;
    var content = 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no';
    if (!noScale && scale !== 1) {
      document.documentElement.style.fontSize = 625 * scale + '%';
      content = 'width=device-width, initial-scale=' + 1 / scale + ', minimum-scale=' + 1 / scale + ', maximum-scale=' + 1 / scale + ', user-scalable=no';
    }
    var meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
}

function getEl(selector) {
  return document.querySelectorAll(selector)
}

scale(/noScale/i.test(location.href));
