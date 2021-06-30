const logPerformance = require('./log-performance');
@logPerformance
class Test {
    debounce() {
        let sum = 0;
        for(let i = 0; i < 100000; i++) {
            sum += i;
        }
        return sum;
    }
    throttle() {
        let sum = 0;
        for(let i = 0; i < 50; i++) {
            sum += i;
        }
        return sum;
    }
}

@logPerformance
class Start {
    start() {
        const test = new Test();
        test.debounce();
        test.throttle();
        this.end();
    }
    end() {
        // doSomething
    }
}
  
const start = new Start();
start.start();
start.end();