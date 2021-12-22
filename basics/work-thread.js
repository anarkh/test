/*
 * @Author: lichenyang.anarkh
 * @LastEditors: lichenyang.anarkh
 * @Description: 
 */
var PrimeGenerator = require('prime-generator')
const {
    Worker, MessagePort, isMainThread, parentPort
} = require('worker_threads');
if (isMainThread) {
    const worker = new Worker(__filename);
    let ia;
    worker.on('message', (value) => {
        console.log('get:', Date.now());
        ia = value;
        console.log('received:', Buffer.from(ia));
        console.log(ia.length);// 100000
        console.log(ia[37]);// 输出 163，因为这是第38个质数
    });
} else {
    // 分配 10 万个 32 位整数占据的内存空间
    const sab =new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT *100000);
    // const sab =new ArrayBuffer(Int32Array.BYTES_PER_ELEMENT *100000);
    // 建立 32 位整数视图
    const ia =new Int32Array(sab);// ia.length == 100000
    // 新建一个质数生成器
    const primes = PrimeGenerator();
    // 将 10 万个质数，写入这段内存空间
    for( let i=0; i < ia.length ; i++){
        ia[i]= primes.next().value;
    }
    // 向 Worker 线程发送这段共享内存
    console.log('send:', Date.now());
    parentPort.postMessage(sab);
}
