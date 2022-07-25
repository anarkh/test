const concurrentPromise = (asyncList, callback) => {
  return new Promise((resolve, reject) => {
    const length = asyncList.length
    const results = []

    const taskQueue = () => {
      let index = 0
      let lock = false
      const dispatch = async (i) => {
        if (i === length) {
          resolve('over')
        } else if (results[i]) {
          await callback(results[i])
          index = i + 1
          await dispatch(index)
        } else {
          lock = false
        }
      }
      return () => {
        if (lock) {
          return false
        }
        lock = true
        dispatch(index)
      }
    }
    const dispatch = taskQueue()
    for (let i = 0; i < length; i++) {
      asyncList[i]().then((res) => {
        results[i] = res
        dispatch()
      }, (err) => {
        return reject(err)
      })
    }
  })
}

const timeOut = (t) => new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, t)
})
const promiseList = [
  async () => {
    console.log('------------------start1')
    await timeOut(3000)
    console.log('------------------end1')
    return 1
  },
  async () => {
    console.log('------------------start2')
    await timeOut(2000)
    console.log('------------------end2')
    return 2
  },
  async () => {
    console.log('------------------start3')
    await timeOut(1000)
    console.log('------------------end3')
    return 3
  }
]
// concurrentPromise(promiseList, (res) => {
//   console.log(res)
// }).then((res) => { console.log(res) })

// Promise.all(promiseList).then(values => {
//   console.log(values);
// }, reason => {
//   console.log(reason)
// });
const pall = async () => {
  const start = Date.now();
  await Promise.all(promiseList.map(async (user) => {
    await user();
  }));
  console.log(start-Date.now());
}
pall();