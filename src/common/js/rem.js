(function (doc, win) {
   let docEl = doc.documentElement
   let isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
   let dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1
       dpr = window.top === window.self ? dpr : 1
   let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
   docEl.dataset.dpr = dpr
   let recalc = function () {
     let width = docEl.clientWidth
     if (width / dpr > 750) {
         width = 750 * dpr
    }
     docEl.dataset.width = width
     docEl.dataset.percent = 100 * (width / 750)
     docEl.style.fontSize = 100 * (width / 750) + 'px'
   }
   recalc()
   if (!doc.addEventListener) return
   win.addEventListener(resizeEvt, recalc, false)
})(document, window)