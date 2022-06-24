const increment = () => {
  let start = process.uptime()
  return () => {
    const end = process.uptime()
    const duration = end - start
    start = end
    return Math.floor(duration * 1000)
  }
}

const test = increment()
console.log(test())
setTimeout(() => {
  console.log(test())
}, 100)
setTimeout(() => {
  console.log(test())
}, 200)
