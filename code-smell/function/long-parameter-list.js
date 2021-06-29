/**
 * 过长参数列表
 * 优化手段：引入参数对象；以查询取代参数；移除标记参数
 */

// bad
const longParameter = (avg1, avg2, avg3, avg4, avg5) => {
    // doSomething
    return avg1 + avg2 + avg3 + avg4 + avg5;
}

// good 引入参数对象
const longParameter = (avgObject) => {
    // doSomething
    return avgObject.avg1 + avgObject.avg2 + avgObject.avg3 + avgObject.avg4 + avgObject.avg5;
}


// bad if avg2 = fn();
const longParameter = (avg1, avg2) => {
    // doSomething
    return avg1 + avg2;
}

// good 以查询取代参数
const longParameter = (avg1) => {
    // doSomething
    return avg1 + fn();
}