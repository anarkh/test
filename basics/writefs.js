/*
 * @Author: lichenyang.anarkh
 * @LastEditors: lichenyang.anarkh
 * @Description:
 */
// for (var j = 0; j < TESTS.length; j++) {
//   TESTS[j](array);
// }

// for (var j = 0; j < TESTS.length; j++) {
//   var startTime = Date.now();
//   TESTS[j](array);
//   console.log(TESTS[j].name + ':', (Date.now() - startTime), 'ms.');
// }

import { readFileSync, createWriteStream } from 'fs'

'use strict'

if (typeof console === 'undefined') console = { log: print }

const N = 1e7

// https://tc39.github.io/ecma262/#sec-speciesconstructor
function getSpeciesConstructor (o, defaultConstructor) {
  const C = o.constructor
  if (C === undefined) return defaultConstructor
  if (typeof C !== 'function' && typeof C !== 'object') throw new TypeError()

  const S = o[Symbol.species]
  if (S === undefined || S === null) return defaultConstructor
  // Spec says IsConstructor, but a simpler test is used here instead.
  if (typeof S === 'function') return S
  throw new TypeError()
}

function adjustOffset (offset, length) {
  // Use Math.trunc() to convert offset to an integer value that can be larger
  // than an Int32. Hence, don't use offset | 0 or similar techniques.
  offset = Math.trunc(offset)
  // `x !== x`-style conditionals are a faster form of `isNaN(x)`
  if (offset === 0 || offset !== offset) {
    return 0
  } else if (offset < 0) {
    offset += length
    return offset > 0 ? offset : 0
  } else {
    return offset < length ? offset : length
  }
}

// class Buffer extends Uint8Array {
//   customSubarray (begin, end) {
//     const srcLength = this.length
//     const beginIndex = adjustOffset(begin, srcLength)
//     const endIndex = end !== undefined ? adjustOffset(end, srcLength) : srcLength
//     const newLength = endIndex > beginIndex ? endIndex - beginIndex : 0
//     const beginByteOffset = this.byteOffset + beginIndex * this.BYTES_PER_ELEMENT
//     return new (getSpeciesConstructor(this, this.constructor))(this.buffer, beginByteOffset, newLength)
//   }
// }
// Buffer.prototype[Symbol.species] = Buffer

function testCustomSubarray (o) {
  let result = 0
  for (let i = 0; i < N; ++i) {
    result += o.slice(3, 4).length
  }
  return result
}

function testSubarray (o) {
  let result = 0
  for (let i = 0; i < N; ++i) {
    result += o.subarray(3, 4).length
  }
  return result
}

const TESTS = [
  testCustomSubarray,
  testSubarray
]
const source = '';
const array = Buffer.from(source, 'hex');
const ws = createWriteStream('./test.js')
ws.write(array)
ws.end()
