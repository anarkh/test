/*
 * @Author: lichenyang.anarkh
 * @LastEditors: lichenyang.anarkh
 * @Description:
 */
const PrimeGenerator = require('prime-generator')
const {
  parentPort, getEnvironmentData
} = require('worker_threads');

console.log(getEnvironmentData('Hello'));
// 分配 10 万个 32 位整数占据的内存空间
const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 100000)
// const sab =new ArrayBuffer(Int32Array.BYTES_PER_ELEMENT *100000);
// 建立 32 位整数视图
const ia = new Int32Array(sab)// ia.length == 100000
// 新建一个质数生成器
const primes = PrimeGenerator()
// 将 10 万个质数，写入这段内存空间
for (let i = 0; i < ia.length; i++) {
  ia[i] = primes.next().value
}
// 向 Worker 线程发送这段共享内存
console.log('send:', Date.now())
parentPort.postMessage(sab);
