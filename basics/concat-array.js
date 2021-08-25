
const { types } = require('util');
const composeArray = (target, extra) => {
    if (Array.isArray(extra)) {
        target = target.concat(extra);
    } else if(types.isPromise(extra)) {
        target.push(extra);
    }
    return target;
};

const test = () => {
    let origin = ['1'];
    origin = composeArray(origin, ['2']);
    console.log(origin);
}

test();
const t = async () => {};
const d = new Promise((resolve) => {
    resolve(1);
});
console.log(types.isAsyncFunction(t));
console.log(types.isPromise(d));