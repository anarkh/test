import Koa from 'koa';
import n from './fetch.js';
const app = new Koa();
const url = "https://blog.csdn.net/qq744746842/article/details/114265353";
app.use(async (ctx, next) => {
  if(ctx.request.path === '/a'){
    ctx.redirect('/b');
    return;
  }
  await next();
  console.log('1');
});
app.use(async (ctx, next) => {
  if(ctx.request.path === '/a'){
    ctx.status = 200;
    ctx.body = 'a';
  } else if(ctx.request.path === '/b'){
    ctx.status = 200;
    ctx.body = `<iframe id="TopFrame" name="PREVIEW_TARGET_0" src="${url}" referrer-policy="no-referrer" width="377" height="764" class="iframe-box" style="border: 1px solid rgb(241, 241, 241);">loading</iframe>
    <iframe id="TopFrame2" name="PREVIEW_TARGET_1" src="${url}" referrer-policy="no-referrer" width="377" height="764" class="iframe-box" style="border: 1px solid rgb(241, 241, 241);">loading</iframe>
`;
  } else if(ctx.request.path === '/c'){
    const result = await n();
    console.log('--------------------', Object.keys(result));
    ctx.status = 200;
    ctx.body = result.data;
  }
});
app.listen(9900, ()=>{console.log('start');});
