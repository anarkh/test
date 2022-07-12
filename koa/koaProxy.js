const Koa = require('koa')
const http = require('http')
const app = new Koa()
app.use(async (ctx, next) => {
  console.log(ctx);
  const options = {
    port: 3000,
    host: '127.0.0.1',
    method: 'GET',
    path: 'http://localhost:9001/'
  }
  // const req = http.request(options)
  // req.end()

  // req.on('response', (res) => {
  //   res.pipe(ctx.res)
  // })
  // ctx.respond = false
})
app.listen(9900);