const check = require('./check')

class PerformanceTrace {
  constructor () {
    this.level = 0
    this.traceArr = []
    this.pointArr = []
  }

  levelUp () {
    this.level += 1
  }

  levelDown () {
    this.level -= 1
    if (this.level === 0) {
      this.print()
    }
  }

  push (trace) {
    this.levelUp()
    this.pointArr.push(this.traceArr.length)
    this.traceArr.push({
      name: trace.name,
      level: this.level
    })
  }

  setDuration (duration) {
    const point = this.pointArr.pop()
    this.traceArr[point].duration = duration
    this.levelDown()
  }

  print () {
    this.traceArr.forEach((o) => {
      console.log(`${'-'.padStart(o.level * 4)}${o.name.padEnd(30)}duration: ${o.duration}`)
    })
    this.clear()
  }

  clear () {
    this.traceArr = []
  }
}

const performanceTrace = new PerformanceTrace()

function classPerformance (target) {
  const protoName = Object.getOwnPropertyNames(target.prototype)
  const ClassName = target.prototype.constructor.name
  Object.keys(protoName).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(
      target.prototype,
      protoName[key]
    )
    const originalFun = descriptor && descriptor.value
    if (typeof originalFun === 'function') {
      descriptor.value = function (...args) {
        const startTime = Date.now()
        const funFullName = `${ClassName}: ${protoName[key]}`
        performanceTrace.push({
          name: funFullName
        })
        try {
          return originalFun.call(this, ...args)
        } catch (e) {
          console.log(e)
          throw e
        } finally {
          performanceTrace.setDuration(Date.now() - startTime)
        }
      }
    }
    Object.defineProperty(target.prototype, protoName[key], {
      ...descriptor
    })
  })
}
function functionPerformance (target, name, descriptor) {
  const originalFun = descriptor && descriptor.value
  const originalDescriptor = descriptor
  if (descriptor && typeof descriptor.value === 'function') {
    originalDescriptor.value = function (...args) {
      const startTime = Date.now()
      try {
        return originalFun.call(this, ...args)
      } catch (e) {
        console.log(e)
        throw e
      } finally {
        console.log(`${'performance:'.padEnd(15)}[Fun] ${name.padEnd(30)}[time]: ${Date.now() - startTime}`)
      }
    }
  }
  return originalDescriptor
}
function logPerformance (target, name, descriptor) {
  if (descriptor && descriptor.value) {
    functionPerformance(target, name, descriptor)
  } else if (check.isObject(target)) {
    classPerformance(target)
  }
}

module.exports = logPerformance
