const httpProxy = require('http-proxy')
const http = require('http')

const rProxyHttp = async (options, ctx) => {
  const { request } = ctx
  const defaultPort = options.useHttps ? 443 : 80
  const defaultOrigin = `${options.useHttps ? 'https' : 'http'}://${options.host}`
  const settings = {
    path: options.url || request.url,
    method: request.method,
    headers: Object.assign({}, request.headers, {
      host: options.host,
      origin: options.origin || defaultOrigin,
      referer: options.referer || options.origin || defaultOrigin
    }),
    host: options.host || request.host,
    port: options.port || defaultPort,
    rejectUnauthorized: options.rejectUnauthorized || false
  }
  if (settings.headers['content-length'] === 0) {
    delete settings.headers['content-length']
  }
  const req = http.request(settings)
  req.end()
  req.on('response', (proxyRes) => {
    proxyRes.pipe(ctx.res)
  })
  req.on('error', console.log)

  const consumer = new Consumer()
  ctx.respond = false
}

const proxyServer = httpProxy.createProxyServer({})

const proxyHttp = async (ctx, option) => {
  const proxyHttp = (ctx, option) => {
    proxyServer.web(ctx.req, ctx.res, {
      target: {
        host: option.host,
        port: option.port
      }
    })
  }

  const consumer = new Consumer()
  const proxyUse = 'proxyHttp'
  module.exports = () => async (ctx, next) => {
    const response = await (consumer.select('52eab56', 'normal.iwaort'))
    console.log(response)
    // const response = await (consumer.select('Development', 'normal.iwan.game_vue3_ssr_g.main_port'));
    // console.log('1');
    if (response) {
      const { instance: { host, port } } = response
      await proxyHttp(ctx, { host, port })
      if (proxyUse === 'proxyHttp') {
        proxyHttp(ctx, { host, port })
      } else {
        await rProxyHttp({
          host,
          port
        }, ctx)
      }
      ctx.respond = false
    } else {
      await next()
    }
  }
}
