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
  try {
    return document.querySelectorAll(selector)
  } catch (e) {
    return []
  }
}

function createEl(tag, attrs) {
  if (!tag) return document.createDocumentFragment()
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
    renderId: /\/\*RENDER_ID:\s*(([^\n/*]?(\/(?!\*))?(\*(?!\/))?)*)\s*\*\//,
    name: /\/\*NAME:\s*(([^\n/*]?(\/(?!\*))?(\*(?!\/))?)*)\s*\*\//,
    desc: /\/\*DESC:\s*(([^\n/*]?(\/(?!\*))?(\*(?!\/))?)*)\s*\*\//
  }

  var arr = jsText.split(/\/\*START\*\/|\/\*END\*\//)

  return arr
    .slice(1, arr.length - 1)
    .filter(function (content) {
      return /\w/.test(content)
    })
    .map(function (content) {
      var renderId = (content.match(reg.renderId) || [, ''])[1]
      var name = (content.match(reg.name) || [, 'default'])[1]
      var desc = (content.match(reg.desc) || [, ''])[1]
      return {
        renderId: renderId,
        name: name,
        desc: desc,
        code: content
          .replace(reg.renderId, '')
          .replace(reg.name, '')
          .replace(reg.desc, '')
          .replace(/((^\n*)|(\n*$))/, '')
      }
    })
}

function createCodeFragment(codeSections, codeDealFn) {
  var codeRenderedCount = 0
  codeSections.some(function (section) {
    return section.renderId
  })
  var codeFragment = createEl()
  var sectionName, sectionDesc, code
  if (codeSections instanceof Array) {
    codeSections.forEach(function (section) {
      var frag = createEl()
      if (section.name && section.name !== 'default') {
        sectionName = createEl('h2', { className: 'code-title', html: section.name })
        frag.appendChild(sectionName)
      }
      if (section.desc) {
        sectionDesc = createEl('p', { className: 'root-desc', html: section.desc })
        frag.appendChild(sectionDesc)
      }
      if (section.code) {
        code = createEl('pre', { className: 'code', text: section.code })
        frag.appendChild(code)
        if (typeof codeDealFn === 'function') codeDealFn(code)
      }

      if (section.renderId) {
        var parent = getEl('#' + section.renderId)[0]
        if (parent) {
          parent.appendChild(frag)
          parent.className = parent.className ? parent.className + ' ' + 'code-wrap' : 'code-wrap'
          codeRenderedCount++
        } else {
          codeFragment.appendChild(frag)
        }
      } else {
        codeFragment.appendChild(frag)
      }
    })
  }

  if (codeRenderedCount < codeSections.length) {
    var codeWrap = createEl('section', {
      className: 'other-code-wrap',
      html: '<h2 class="root-h code-h">' + (codeRenderedCount !== 0 ? 'Other Code' : 'Code') + '</h2><br>'
    })
    codeWrap.appendChild(codeFragment)
    document.body.appendChild(codeWrap)
  }
}

setViewport(/noScale/i.test(location.href))

window.addEventListener('DOMContentLoaded', function () {
  var code = getEl('#code')[0]
  if (code) createCodeFragment(parseJsText(code.innerText), function (node) {
    if (hljs && hljs.highlightBlock) {
      hljs.configure({
        languages: ['javascript']
      })
      hljs.highlightBlock(node)
    }
  })
})
