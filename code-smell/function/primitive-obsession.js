/**
 * 基本类型偏执
 */

// bad
const money = 100;

// good 对象取代基本类型
const money = {
    type: 'rmb',
    count: 100,
};