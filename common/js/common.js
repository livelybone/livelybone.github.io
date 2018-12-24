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

function createEl(tag, attrs) {
  var el = document.createElement(tag)
  Object.keys(attrs).forEach(function (attr) {
    if (attr === 'class' || attr === 'className') el.className = attrs[attr]
    else if (attr === 'innerText' || attr === 'text') el.innerText = attrs[attr]
    else if (attr === 'innerHTML' || attr.toLowerCase() === 'html') el.innerHTML = attrs[attr]
    else el.setAttribute(attr, attrs[attr])
  })
  return el
}

function parseJsText(jsText) {
  var reg = {
    section: /\/\*START\*\/[\d\D]*\/\*END\*\//g,
    sectionContent: /\/\*START\*\/\n?([\d\D]*)\/\*END\*\//,
    name: /\/\*NAME:\s*(.*)\*\//,
    desc: /\/\*DESC:\s*(.*)\*\//
  }

  return jsText.match(reg.section).map(function (section) {
    var content = section.match(reg.sectionContent)[1] || ''
    var name = (content.match(reg.name) || [, 'default'])[1]
    var desc = (content.match(reg.desc) || [, ''])[1]
    return {
      name: name,
      desc: desc,
      code: content.replace(reg.name, '').replace(reg.desc, '').replace(/((^\n*)|(\n*$))/, '')
    }
  })
}

function createCodeFragment(codeSections, codeDealFn) {
  var codeWrap = createEl('section', {
    className: 'code-wrap',
    html: '<h2 class="h code-h">Code</h2><br>'
  })
  var sectionName, sectionDesc, code
  if (codeSections instanceof Array) {
    codeSections.forEach(function (section) {
      if (section.name && section.name !== 'default') {
        sectionName = createEl('h2', { className: 'code-title', text: 'Module: ' + section.name })
        codeWrap.appendChild(sectionName)
      }
      if (section.desc) {
        sectionDesc = createEl('p', { className: 'frame-desc', text: section.desc })
        codeWrap.appendChild(sectionDesc)
      }
      if (section.code) {
        code = createEl('pre', { className: 'code', text: section.code })
        codeWrap.appendChild(code)
        if (typeof codeDealFn === 'function') codeDealFn(code)
      }
    })
  }
  document.body.appendChild(codeWrap)
}

setViewport(/noScale/i.test(location.href))

window.addEventListener('DOMContentLoaded', function () {
  const code = getEl('#code')[0]
  if (code) createCodeFragment(parseJsText(code.innerText), function (node) {
    if (hljs && hljs.highlightBlock) {
      hljs.configure({
        languages: ['javascript']
      })
      hljs.highlightBlock(node)
    }
  })
})
