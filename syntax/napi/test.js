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
try {
    const echo2 = addon.echo();
    console.log(echo2);
} catch(error) {
    console.log(error);
}
