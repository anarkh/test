/*
 * @Author: lichenyang.anarkh
 * @LastEditors: lichenyang.anarkh
 * @Description: 
 * rebuild: node-gyp rebuild
 * run: node --napi-modules ./test.js
 */
const addon = require("./build/Release/addon");
const echo1 = addon.echo("1111");
console.log(echo1);
console.log(addon.add(1, 3));
