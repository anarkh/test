import Koa from 'koa'
import n from './fetch.js'
const app = new Koa()
const url = 'https://blog.csdn.net/qq744746842/article/details/114265353'
app.use(async (ctx, next) => {
  if (ctx.request.path === '/a') {
    ctx.redirect('/b')
    return
  }
  await next()
  console.log('1')
})
app.use(async (ctx, next) => {
  if (ctx.request.path === '/a') {
    ctx.status = 200
    ctx.body = 'a'
  } else if (ctx.request.path === '/b') {
    ctx.status = 200
    ctx.body = `<iframe id="TopFrame" name="PREVIEW_TARGET_0" src="${url}" referrer-policy="no-referrer" width="377" height="764" class="iframe-box" style="border: 1px solid rgb(241, 241, 241);">loading</iframe>
    <iframe id="TopFrame2" name="PREVIEW_TARGET_1" src="${url}" referrer-policy="no-referrer" width="377" height="764" class="iframe-box" style="border: 1px solid rgb(241, 241, 241);">loading</iframe>
`
  } else if (ctx.request.path === '/c') {
    const result = await n()
    console.log('--------------------', Object.keys(result))
    ctx.status = 200
    ctx.body = result.data
  } else if (ctx.request.path === '/d') {
    ctx.status = 200
    ctx.body = `<html>
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
        <meta name="format-detection" content="telephone=no"/>
    </head>
    <body>
        <div class="mainwrap">ceshi</div>
        <script src="https://cdn.staticfile.org/jquery/2.2.4/jquery.min.js"></script>
        <script>
            $.ajax({
                url: "https://internal-lynxtest.boe.druid.vip/index",
                type: "GET",
                dataType: 'json',
                headers: {
                    "Druid-Template-Format-Json": "true",
                },
                success: function (data) {
                    console.log(data);
                },
                error: function (e) {
                    console.log(e);
                }
            });
        </script>
    </body>
</html>
`
  }
})
app.listen(3002, () => { console.log('start') })
