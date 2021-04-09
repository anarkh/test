const http = require('http');
// 创建 HTTP 隧道代理。
const proxy = http.createServer((request, response) => {
  // 向隧道代理发出请求。
  const options = {
    port: 9001,
    host: '127.0.0.1',
    method: 'GET',
    path: 'http://localhost:9001/'
  };

  const req = http.request(options);
  req.end();
  req.on('response', (res) => {
    res.pipe(response);
  });
});
// 代理正在运行。
proxy.listen(3005);
