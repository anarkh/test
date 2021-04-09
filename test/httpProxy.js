const Koa = require('koa');
const httpProxy = require('http-proxy');
const app = new Koa();
const proxy = httpProxy.createProxyServer();

app.use(async (ctx, next) => {
  proxy.web(ctx.req, ctx.res, {
    target: {
      host: '127.0.0.1',
      port: 9001,
    },
  });
  ctx.respond = false;
});
app.listen(9900);
