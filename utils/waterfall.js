// 1. 实现一个流程控制函数, 使得若干任务按照顺序执行，且每个任务的返回结果都将传给下一个任务。如果中途出错，后面的任务则不会被执行，并返回当前执行结果。
// 方法签名：
//
// 参数：
// tasks：一组要运行的异步函数。每个函数可接受若干入参和一个callback函数。每个函数          的执行结果将传递给下一个函数（见示例）。
// callback：回调函数，参数列表（err，[results]），返回最后执行任务完毕的结果
waterfall([
  function (callback) {
    callback(null, 'one', 'two')
  },
  function (arg1, arg2, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two'
    callback(null, 'three')
    // callback('err', 'three');  => 结果 'err', 'three'
  },
  function (arg1, callback) {
    // arg1 now equals 'three'
    callback(null, 'done')
  },
], (err, result) => {
  // result now equals 'done'
})

function waterfall(middlewares){
  if(!Array.isArray(middlewares)){
    return;
  }
}


function compose(arr){
  let index = -1;
  const length = arr.length;
  const dispatch = (i) => {
    index = i;
    const fn = arr[i];

  }
}
