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
