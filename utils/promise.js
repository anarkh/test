class Promise{
  constructor(fun) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.callback = [];
    fun(this.resolve.bind(this), this.reject.bind(this));
  }
  resolve(value){
    this.value = value;
    this.status = 'fulfilled';
    this.callback.forEach((callback) => {
      this.handle(callback);
    });
  }
  reject(reason){
    this.reason = reason;
    this.status = 'rejected';
    this.callback.forEach((callback) => {
      this.handle(callback);
    });
  }
  then(onFulfilled, onRejected){
    this.callback.push({
      onFulfilled,
      onRejected,
    });
  }
  handle(callback) {
    const { onFulfilled, onRejected } = callback;
    if(this.status === 'fulfilled' && onFulfilled){
      onFulfilled(this.value);
    }
    if(this.status === 'rejected' && onRejected){
      onRejected(this.reason);
    }
  }
}

const promiseTest = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2)
  }, 500);
})
promiseTest.then(console.log);
