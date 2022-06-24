const promiseFn = () => new Promise((resolve) => {
  console.log('Promise')
  setTimeout(() => {
    resolve('done')
  }, 2000)
})
const asyncFn = async () => {
  console.log('async')
  return await promiseFn()
}

const flow1 = async () => {
  asyncFn()
}
const flow2 = async () => {
  const test = await asyncFn()
  console.log(`test:${test}`)
}
const flow = async () => {
  await flow1()
  await flow2()
}

flow()
