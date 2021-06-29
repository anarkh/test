/**
 * 基本类型偏执
 * 表现：不愿对小问题域运用对象；优化手段：以对象取代基本类型
 */

// bad
const money = 100;

// good 对象取代基本类型
const money = {
    type: 'rmb',
    count: 100,
};