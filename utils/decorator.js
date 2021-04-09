const debounceDecorator = (t) => {
  let timer = null;
  return (target, name, descriptor) => {
    const func = descriptor.value;
    descriptor.value = function (...args) {
      if(timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func.apply(this, ...args);
      }, t);
    }
  }
}

const throttleDecorator = (t) => {
  return (target, name, descriptor) => {
    if(!Object.prototype.hasOwnProperty.call(target, 'flag')){
      Object.defineProperty(target, 'flag', {
        value: false,
        writable: true
      });
    }
    const func = descriptor.value;
    descriptor.value = function (...args) {
      if (target.flag) {
        return null;
      }
      target.flag = true;
      setTimeout(() => {
        target.flag = false;
      }, t);
      func.apply(this, ...args);
    }
  }
}

class Test {
  @debounceDecorator(300)
  debounce() {
    console.log('debounce');
  }
  @throttleDecorator(3000)
  throttle() {
    console.log('throttle');
  }
}

const test = new Test();
test.debounce();
test.debounce();
test.throttle();
test.throttle();
