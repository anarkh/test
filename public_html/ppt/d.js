/*
 * Created by chenyangli on 2017-4-18.
 */

var danceword = {
  interval: 60,
  loop: false,
  isComeHere: function (obj) {
    let h1 = document.body.scrollTop
    if (!/Chrome|Safari/.test(navigator.userAgent)) {
      h1 = document.documentElement.scrollTop
    }
    const h2 = $(window).height()
    return (h1 + h2 - $(obj).offset().top) >= $(obj).height()
  },
  isVisible: function (obj) {
    let h1 = document.body.scrollTop
    if (!/Chrome|Safari/.test(navigator.userAgent)) {
      h1 = document.documentElement.scrollTop
    }
    const h2 = $(window).height()
    return h1 + h2 - $(obj).offset().top >= $(obj).height() && $(obj).offset().top + $(obj).height() >= h1
  },
  showCore: function (obj) {
    const me = this
    if (!me.loop) {
      $(obj).find("[class^='danceWord']:not(.past)").each(function () {
        const tmp = $.trim($(this).text())
        let h = ''
        for (const i in tmp) {
          h += '<span>' + tmp[i] + '</span>'
        }
        h = h.replace(/<\/span><span>([\，\,\。\.\!\！\?\？])/g, '$1')
        $(this).html(h)
      })
      $(obj).find("[class^='danceWord']:not(.past)").each(function () {
        const m1 = this
        const l = $(this).text().length
        if (me.isComeHere(m1)) {
          $(m1).find('span').each(function (k, v) {
            const me2 = this
            setTimeout(function () { $(me2).addClass('ele') }, (k + 1) * me.interval)
          })
          setTimeout(function () {
            $(m1).html($(m1).text())
          }, l * me.interval + 500)
          $(m1).addClass('past')
        }
      })
    } else {
      $(obj).find("[class^='danceWord']").each(function () {
        const m1 = this
        const l = $(this).text().length
        if (!me.isVisible(m1)) {
          $(m1).removeClass('past')
          var tmp = $.trim($(m1).text())
          var h = ''
          for (var i in tmp) {
            h += '<span>' + tmp[i] + '</span>'
          }
          h = h.replace(/<\/span><span>([\，\,\。\.\!\！\?\？])/g, '$1')
          $(m1).html(h)
        }
        if (me.isVisible(m1) && !$(m1).hasClass('past')) {
          var tmp = $.trim($(m1).text())
          var h = ''
          for (var i in tmp) {
            h += '<span>' + tmp[i] + '</span>'
          }
          h = h.replace(/<\/span><span>([\，\,\。\.\!\！\?\？])/g, '$1')
          $(m1).html(h).addClass('past')
          $(m1).find('span').each(function (k, v) {
            const me2 = this
            setTimeout(function () { $(me2).addClass('ele') }, (k + 1) * me.interval)
          })
          setTimeout(function () {
            $(m1).html($(m1).text())
          }, l * me.interval + 500)
        };
      })
    }
    if (/MSIE/.test(navigator.userAgent) || navigator.userAgent.indexOf('Trident/7.0;') > -1) {
      $(obj).find('[class^="danceWord"] span').css('display', 'inline')
    }
  },
  init: function (obj) {
    const me = danceword
    if (typeof a === 'object') {
      $.extend(me, a)
    }
    me.showCore(obj)
  }
}
