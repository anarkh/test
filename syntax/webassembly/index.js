/*
 * @Author: lichenyang.anarkh
 * @LastEditors: lichenyang.anarkh
 * @Description: 
 * source ../../../../git/emsdk/emsdk_env.sh
 * emcc test.c -O2 -s WASM=1 -s SIDE_MODULE=1 -o test.wasm
 */
const util = require('util');
const fs = require('fs');
const source = fs.readFileSync('./test.wasm');
const env = {
    memoryBase: 0,
    tableBase: 0,
    memory: new WebAssembly.Memory({
      initial: 256
    }),
    table: new WebAssembly.Table({
      initial: 0,
      element: 'anyfunc'
    })
  }

  const typedArray = new Uint8Array(source);

WebAssembly.instantiate(typedArray, {
  env: env
}).then(result => {
  console.log(util.inspect(result, true, 0));
  console.log(result.instance.exports._add(9, 9));
}).catch(e => {
  // error caught
  console.log(e);
});

// const wasm = await WebAssembly.compile(
//     await readFile(new URL('./add.wasm', import.meta.url))
//   );
//   const instance = await WebAssembly.instantiate(wasm, importObject);
// WebAssembly.instantiateStreaming("./add.wasm")
// .then(obj => obj.instance.exports._Z3addii)
// .then(add => {
//     document.getElementById("addTarget").textContent = add(
//     getRandomNumber(),
//     getRandomNumber()
//     );
//     console.log(add(1,2));
// });