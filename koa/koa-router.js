import Koa from 'koa'
import Router from 'koa-router'
const app = new Koa()
const router = new Router()
router.get('/a', async (ctx, next) => {
  console.log(1)
  await next()
})
router.get('/a', async (ctx, next) => {
  console.log(2)
  await next()
})
app.use(async (ctx, next) => {
  console.log('start', Date.now())
  await next()
  console.log('end', Date.now())
})
app.use(router.routes())
app.use(async (ctx, next) => {
  console.log('--------1--------')
  await next()
  console.log('--------2--------')
})
app.use(async (ctx, next) => {
  console.log('--------3--------')
  ctx.body = '111';
  ctx.status = 200;
  await next()
  console.log('--------2--------')
})
app.listen(9900, () => { console.log('start') })
