const obj1 = '{"a":{"a":1},"doc_id":7079637143148123456,c:1}';
const obj2 = '{"a":{"a":1},"doc_id":7079637143148123456 }';
const obj3 = '{"a":1,"b":"{\\"doc_id\\":7079637143148123456,c:1}"}';

// 正则匹配 s中的bigint

// const reg = /[^\\]":\s*([-+Ee0-9.]{16,20}),/g;
const reg = /([^\\])":\s*([0-9]{15,20})\s*([,}]{1})/g;
let handleString = (stringData) => stringData.replace(reg, '$1":"$2"$3');
// let handleString = (stringData) => stringData.match(reg);
const replacer = (_key, value) => {
    // only changing strings
    if (typeof value !== 'string') return value;
    // only changing number strings
    if (!value.startsWith('uniqueprefix')) return value;
    // chip off the prefix
    value = value.slice('uniqueprefix'.length);
    // pick your favorite arbitrary-precision library
    return value.toString();
}
// console.log(handleString(obj));
// result =JSON.parse(handleString(obj));
// result = JSON.parse(handleString(obj));
// const json = require('./1.json');
// console.log(JSON.stringify(json));
console.log(handleString(obj1));
console.log(handleString(obj2));
console.log(handleString(obj3));
