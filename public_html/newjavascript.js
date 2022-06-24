/*
 * Created by chenyangli on 2017-12-20.
 */

function getColor () {
  const c = document.createElement('canvas')
  if (!c.getContext) {
    alert('很遗憾，您浏览器版本太老了，无法使用我们的小工具 ！')
    return
  }
  const d = document.getElementById('pic').getElementsByTagName('img')
  if (d.length === 0) { alert('请选择一张本地图片'); return }
  if (!confirm('列出所有颜色会比较慢，请耐心等待，您要继续进行操作吗？')) { return }
  document.getElementById('topResult').innerHTML = ''
  const a = c.getContext('2d')
  const b = new Image()
  b.onload = function () {
    const u = b.width
    const r = b.height; c.width = u; c.height = r; a.drawImage(b, 0, 0)
    document.getElementById('result').innerHTML = ''
    let e = false
    let l
    if (document.getElementById('cbxOmitted').checked) {
      e = true; l = 10
    } else {
      l = 1
    }
    const s = []
    const k = []
    for (let q = 0; q < u; q += l) {
      for (let o = 0; o < r; o += l) {
        const g = a.getImageData(q, o, l, l)
        const m = '#' + int2hex(g.data[0]) + int2hex(g.data[1]) + int2hex(g.data[2])
        if (e) {
          if (!checkHasColor(k, g.data[0], g.data[1], g.data[2]) && s.indexOf(m) === -1) {
            s.push(m)
            k.push([g.data[0], g.data[1], g.data[2]])
          }
        } else {
          if (s.indexOf(m) === -1) {
            s.push(m)
          }
        }
      }
    }
    for (let t = 0; t < s.length; t++) {
      const f = document.createElement('div')
      f.style.cssText = 'width:120px; display:inline-block;'
      f.innerHTML = '<span style="background-color:' + s[t] + '">&nbsp;&nbsp;&nbsp;&nbsp;</span>' + s[t]
      document.getElementById('result').appendChild(f)
    }
  }
  b.src = d[0].src
}
function int2hex (a) {
  const b = parseInt(a).toString(16)
  if (b.length == 1) {
    return '0' + b
  }
  return b.toUpperCase()
}
function checkHasColor (c, f, e, a) {
  for (let d = 0; d < c.length; d++) {
    const h = equalsColor(c[0], c[1], c[2], f, e, a)
    if (h >= 0.8) { return true }
  }
  return false
}
function equalsColor (e, d, f, b, a, c) {
  return (255 - Math.abs(e - b) * 0.297 - Math.abs(d - a) * 0.593 - Math.abs(f - c) * 0.11) / 255
}
function setFiles () {
  if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    alert('很遗憾，您浏览器版本太老了，无法使用我们的小工具 ！')
    return
  }
  const b = document.getElementById('file').files
  document.getElementById('pic').innerHTML = ''
  if (b.length > 0) {
    const a = new FileReader()
    a.onload = function (c) {
      document.getElementById('pic').innerHTML = '<img src="' + this.result + '" onclick="getClickColor(event)" />'
    }
    a.readAsDataURL(document.getElementById('file').files[0])
  }
}
function getClickColor (i) {
  i = i || window.event; const d = document.createElement('canvas')
  if (!d.getContext) {
    alert('很遗憾，您浏览器版本太老了，无法使用我们的小工具 ！')
    return
  }
  const b = d.getContext('2d')
  const c = document.getElementById('pic').getElementsByTagName('img')[0]
  const a = c.width
  const f = c.height; document.getElementById('result').innerHTML = ''
  const g = new Image()
  g.onload = function () {
    d.width = g.width; d.height = g.height
    b.drawImage(g, 0, 0, g.width, g.height, 0, 0, g.width, g.height)
    var e, n; const j = {}
    if (window.touch) {
      var m = c.getBoundingClientRect()
      j.x = touch.clientX - m.left
      j.y = touch.clientY - m.top
    } else {
      if (i.offsetX) {
        j.x = i.offsetX
        j.y = i.offsetY
      } else {
        var m = c.getBoundingClientRect()
        j.x = i.clientX - m.left
        j.y = i.clientY - m.top
      }
    }
    var e = g.width * j.x / a
    var n = g.height * j.y / f
    console.log(e, n)
    const l = b.getImageData(e, n, 1, 1)
    const h = '#' + int2hex(l.data[0]) + int2hex(l.data[1]) + int2hex(l.data[2])
    const k = document.createElement('div')
    k.style.cssText = 'width:120px; display:inline-block;'
    k.innerHTML = '<span style="background-color:' + h + '">&nbsp;&nbsp;&nbsp;&nbsp;</span>' + h
    document.getElementById('result').appendChild(k)
    document.getElementById('topResult').innerHTML = '<div style="width:120px; display:inline-block;"><span style="background-color:' + h + '">&nbsp;&nbsp;&nbsp;&nbsp;</span>' + h + '</div>'
  }
  g.src = c.src
};
