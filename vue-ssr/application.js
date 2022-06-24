const Koa = require('koa')
const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const koa = new Koa()

koa.use(async (context) => {
  const app = createSSRApp({
    data: () => ({
      url: context.path
    }),
    template: '<div>现在访问的页面是 {{url}}</div>'
  })

  const html = await renderToString(app)
  context.body = html
})

koa.listen(8888)
