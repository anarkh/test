'use strict'
let a = 1;
var b = 1;
function f() {
  let a = 2;
  var b = 2;
  console.log(a, b);
}
function f1() {
  let a = 3;
  var b = 3;
}

f();
f1();
console.log(a, b);
