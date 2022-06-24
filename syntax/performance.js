const Koa = require('koa')
const _loadWasm = require('./webassembly/add.js')
const addon = require('./napi/build/Release/addon')
const app = new Koa()
// const Module = await _loadWasm();
count = 9999999
const napiadd = () => {
  let sum = 0
  let l = count
  while (l > 0) {
    l--
    sum = addon.add(sum, 1)
  }
  return sum
}
const wasmadd = async () => {
  const Module = await _loadWasm()
  let sum = 0
  let l = count
  while (l > 0) {
    l--
    sum = Module._add(sum, 1)
  }
  return sum
}
app.use(async (ctx, next) => {
  if (ctx.request.path === '/a') {
    ctx.status = 200
    ctx.body = await wasmadd()
  } else if (ctx.request.path === '/b') {
    ctx.status = 200
    ctx.body = napiadd()
  } else if (ctx.request.path === '/c') {
  }
  await next()
})
app.listen(9900, () => { console.log('start') })
