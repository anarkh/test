'use strict'
const a = 1
const b = 1
function f () {
  const a = 2
  const b = 2
  console.log(a, b)
}
function f1 () {
  const a = 3
  const b = 3
}

f()
f1()
console.log(a, b)
