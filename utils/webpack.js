(function (modules) { // webpackBootstrap
  // 1. 缓存模块
  const installedModules = {}
  // 2. 定义可以在浏览器使用的require函数
  function __webpack_require__ (moduleId) {
    // 2.1检查模块是否在缓存里，在的话直接返回
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports
    }
    // 2.2 模块不在缓存里，新建一个对象module=installModules[moduleId] {i:moduleId,l:模块是否加载,exports:模块返回值}
    const module = installedModules[moduleId] = {
      i: moduleId, // 第一次执行为0
      l: false,
      exports: {}
    }// 第一次执行module:{i:0,l:false,exports:{}}
    // 2.3 执行传入的参数中对应id的模块 第一次执行数组中传入的第一个参数
    // modules[0].call({},{i:0,l:false,exports:{}},{},__webpack_require__函数)
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
    // 2.4 将这个模块标记为已加载
    module.l = true
    // 2.5 返回这个模块的导出值
    return module.exports
  }
  // 3. webpack暴露属性 m c d n o p
  __webpack_require__.m = modules
  __webpack_require__.c = installedModules
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        configurable: false,
        enumerable: true,
        get: getter
      })
    }
  }
  __webpack_require__.n = function (module) {
    const getter = module && module.__esModule
      ? function getDefault () { return module.default }
      : function getModuleExports () { return module }
    __webpack_require__.d(getter, 'a', getter)
    return getter
  }
  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property) }
  __webpack_require__.p = ''
  // 4. 执行reruire函数引入第一个模块(main.js对应的模块)
  return __webpack_require__(__webpack_require__.s = 0)
})
([ // 0. 传入参数，参数是个数组

  /* 第0个参数 main.js对应的文件 */
  function (module, exports, __webpack_require__) {
    // 通过 CommonJS 规范导入 show 函数
    const show = __webpack_require__(1)// __webpack_require__(1)返回show
    // 执行 show 函数
    show('Webpack')
  },
  /* 第1个参数 show.js对应的文件 */
  function (module, exports) {
    // 操作 DOM 元素，把 content 显示到网页上
    function show (content) {
      window.document.getElementById('app').innerText = 'Hello,' + content
    }
    // 通过 CommonJS 规范导出 show 函数
    module.exports = show
  }
])
