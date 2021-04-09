const Koa = require('koa');
const app = new Koa();
app.use(async (ctx, next) => {
  console.log(ctx.request.path);
  if(ctx.request.path === '/a'){
    ctx.redirect('/b');
    return;
  }
  await next();
  console.log('1');
});
app.use(async (ctx, next) => {
  console.log('-----------------', ctx.request.path);
  if(ctx.request.path === '/a'){
    ctx.status = 200;
    ctx.body = 'a';
  } else if(ctx.request.path === '/b'){
    ctx.status = 200;
    ctx.body = 'b';
  }
});
app.listen(9900, ()=>{console.log('start');});
