/**
 * MIT License
 *
 * Copyright (c) 2018 livelybone(2631541504@qq.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.Copy={})}(this,function(e){"use strict";function o(e,t){var n,o=Object.assign({},t,{clearSelect:!1,cut:!1}),c=o.clearSelect,r=o.cut;if(window.getSelection){var i=window.getSelection();n=window.document.createRange(),i.removeAllRanges(),n.selectNode(e),i.addRange(n)}else document.body.createTextRange&&((n=document.body.createTextRange()).moveToElementText(e),n.select());var a=window.document.execCommand("copy");return c&&i.removeAllRanges(),r&&(e.value=""),a}function l(e){return!("object"!=typeof e||null===e||e instanceof Date||e instanceof Error||e instanceof RegExp||"undefined"!=typeof window&&(e instanceof FileList||e instanceof File||e instanceof Element))}function s(a,f,e,t){var n=[f],o=[a],d=e?[].concat(e).concat(n):n,u=e?[].concat(t).concat(o):o;Object.keys(f).forEach(function(e){var t,n,o,c,r=(t=f[e],o=(n=d)||[],void 0!==(c=Object.keys(o).find(function(e){return n[e]===t}))?{index:c}:void 0);if(r)a[e]=u[r.index];else if(a[e]=f[e],l(f[e])){var i=f[e].constructor;a[e]=new i,s(a[e],f[e],d)}})}function a(i){return Array.prototype.slice.call(arguments,1).forEach(function(r){l(r)&&Object.keys(r).forEach(function(e){var t,n,o,c;t=i,n=r[e],c=t[o=e],l(n)&&l(c)?a(c,n):t[o]=n})}),i}e.copyDom=o,e.copyText=function(e){if(navigator.clipboard)return navigator.clipboard.writeText(e);var t=document.createElement("span");t.style.position="fixed",t.style.left="0",t.style.top="0",t.style.zIndex="-999",t.innerText=e,document.body.appendChild(t);var n=o(t);return document.body.removeChild(t),n},e.objectSimpleCopy=function(e){return JSON.parse(JSON.stringify(e))},e.objectDeepCopy=function(e){if(!l(e))return e;if("object"!=typeof e)throw new Error("Unable to copy obj! Its type isn't supported.");var t=new e.constructor;return s(t,e),t},e.objectDeepMerge=a,Object.defineProperty(e,"__esModule",{value:!0})});