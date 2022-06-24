function debounce (fn, time) {
  let timer = null
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      console.log(this)
      fn.call(this, ...args)
    }, time)
  }
}

function throttle (fn, time) {
  let flag = false
  return (...args) => {
    if (flag) return
    flag = true
    setTimeout(() => {
      flag = false
    }, time)
    fn.call(this, ...args)
  }
}

function test (i) {
  console.log(i)
}

const debounceTest = debounce(test, 300)
debounceTest(1)
debounceTest(2)

const throttleTest = throttle(test, 300)
throttleTest(3)
throttleTest(4)
