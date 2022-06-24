const t1 = new Date().getTime()
const t2 = t1
const i = 0; const count = 10000000; const interval = 0

// t1 = new Date().getTime();
// for(i = 0; i < count; i++)
// {
//   process.uptime()*1000;
// }
// t2 = new Date().getTime();
// console.log('【process.uptime()】interval: ', t2 - t1);

// let hrTime1 = process.hrtime();
// let hrTime2 = hrTime1;
// t1 = new Date().getTime();
// for(i = 0; i < count; i++)
// {
//   hrTime2 = process.hrtime.bigint();
// }
// t2 = new Date().getTime();
// interval = parseInt(hrTime2[0] * 1e3 + hrTime2[1] * 1e-6);
// console.log('【hrTime】interval: ', interval, t2 - t1);

// function duration() {
//     const startTime = process.hrtime();
//     return function seed() {
//         const diff = process.hrtime(startTime);
//         return diff[0] * 1000 + diff[1] / 1e6;
//     };
// }
function duration () {
  const startTime = process.uptime()
  return function seed () {
    const diff = process.uptime()
    const duration = diff - startTime
    return (duration * 1000).toFixed(6)
  }
}
const start = duration()
setTimeout(() => {
  console.log(parseFloat(start()))
}, 100)
