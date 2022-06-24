/*
 * @Author: lichenyang.anarkh
 * @LastEditors: lichenyang.anarkh
 * @Description:
 */
const { compressSync, isValidCompressedSync, uncompressSync } = require('snappy')
const test = require('../test.json')
const inputString = 'beep boop, hello world. OMG OMG OMG'
const inputBuffer = Buffer.from(inputString)

const forLoop = async _ => {
  const json = JSON.stringify(test)
  console.log(json.length)
  const buf = await compressSync(Buffer.from(json))
  console.log(buf.length)
  const s = buf.toString('hex')
  console.log(s.length)
  const buf2 = Buffer.from(s, 'hex')
  console.log(buf2.length)
  const rs = await uncompressSync(buf2, { asBuffer: false })
  console.log(rs.length)
}
forLoop().then()
