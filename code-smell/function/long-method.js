/**
 * 重复的switch
 * 优化手段：抽取方法+卫语句， 以管道取代循环， 提取函数
 */

// bad
const longMethod = (avg1, avg2) => {
    const result = [];
    for(const i of avg1) {
        if (i === 'god') {
            result.push(i);
        }
    }
    // doSomething
    if(avg2) {
        return false;
    }
};

// good
const doSomrthing = () => {
    // doSomething
}
const longMethod = (avg1, avg2) => {
    // 卫语句
    if(avg2) {
        return false;
    }
    // 以管道取代循环
    const result = avg1.filter(i => i === 'god');
    // 提取函数
    doSomrthing();
}