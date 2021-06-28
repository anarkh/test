/**
 * 重复的switch
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
const longMethod = (avg1, avg2) => {
    // 卫语句
    if(avg2) {
        return false;
    }
    // 以管道取代循环
    const result = avg1.filter(i => i === 'god');
    // doSomething
}