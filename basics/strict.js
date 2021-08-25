'use strict'
this.b = 1;
const b = 7;
const a = function () {
  console.log(this);
};
const c = new a();
a.prototype.b = 9;
a();

console.log(b);
console.log(c.b);

function duration() {
  const startTime = process.hrtime();
  return function seed() {
      const diff = process.hrtime(startTime);
      return diff[0] * 1000 + diff[1] / 1e6;
  };
}
function duration2() {
  const startTime = process.hrtime.bigint();
  return function seed() {
      const diff = process.hrtime.bigint() - startTime;
      return diff;
  };
}

const sett = duration();
const sett2 = duration2();

setTimeout(() => {
  const totalD = sett();
  const totalD2 = sett2();
  console.log(totalD);
  console.log(Number(totalD2) / 1e6);
}, 1000);