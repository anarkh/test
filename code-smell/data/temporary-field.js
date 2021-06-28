/**
 * 临时字段
 * 某个实例变量仅为某种特定情况而定而设
 */

// bad
const temp = avg2 - avg1;
if(temp > 0) {
    // doSomething
}

// good
if(avg2 - avg1 > 0) {
    // doSomething
}