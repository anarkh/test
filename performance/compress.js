const mock = 'dwRmbGV4mVyFS5iYXNlLXRhYi1pd'

const snappy = require('snappy')
const lz4 = require('lz4')
const httpEncoding = require('http-encoding')
const count = 50
console.log('原始大小（B）：', mock.length)
const compress = async (type) => {
  switch (type) {
    case 'snappy':
      return snappy.compressSync(mock)
    case 'lz4':
      return lz4.encode(mock)
    case 'gzip':
      return await httpEncoding.gzip(mock)
    case 'brotli':
      return await httpEncoding.brotliCompress(mock)
    case 'zstd':
      return await httpEncoding.zstdCompress(mock)
  }
}

const execute = async (type) => {
  console.log(type)
  let sum = 0
  let i = 0
  while (i < count) {
    const start = Date.now()
    await compress(type)
    const diff = Date.now() - start
    sum += diff
    i++
  }

  const data = await compress(type)
  console.log('压缩后大小：', data.length)
  console.log(`平均耗时：${sum / count}毫秒`)
}
const forLoop = async _ => {
  const list = ['snappy', 'lz4', 'gzip', 'brotli', 'zstd']
  for (let index = 0; index < list.length; index++) {
    await execute(list[index])
  }
  console.log('End')
}
forLoop().then()
