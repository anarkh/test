/*
 * @Author: lichenyang.anarkh
 * @LastEditors: lichenyang.anarkh
 * @Description:
 */
const {
  Worker, setEnvironmentData
} = require('worker_threads');
const { join } = require('path');

const obj = {
    a: '1'
}
setEnvironmentData('Hello', obj);
const worker = new Worker(join(__dirname + '/work-thread.js'));
worker.on('message', (value) => {
    console.log('get:', Date.now())
    const ia = value
    console.log('received:', Buffer.from(ia))
    console.log(ia.length)// 100000
    console.log(ia[37])// 输出 163，因为这是第38个质数
})
