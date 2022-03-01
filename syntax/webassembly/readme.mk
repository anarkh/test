# 准备工作
下载emcc后，注入emcc命令
source ../../../../git/emsdk/emsdk_env.sh

# 基础helloword
实现一个基础的helloword
c代码：hello.c

```C++
#include <stdio.h>
int main(){
    printf("hello world\n");
    return 0;
}
```
运行编译命令：
emcc hello.c -o hello.js
以commonjs方式执行代码（package.json中不要添加 "type": "module"）：
node hello.js

# 实现add函数
c代码：add.cc

```C++
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
extern "C"
{
    int add(int a, int b)
    {
        int res = a + b;
        return res;
    }
    char *addString(char *a, char *b){
        char *res = (char *)malloc(strlen(a)+strlen(b)+1);
        strcpy(res, a);
        strcat(res, b);
        return res;
    }
    int main()
    {
        int res = add(1, 2);
        printf("res: %d\n", res);
    }
}
```
## 添加extern "C"意义
c++为了支持函数重载，默认会对函数的名称进行mangle（即使没有重载） 与传统的将c++编译成动态库，然后js通过ffi调用动态库导出的函数类似，emscripten里如果需要在JS里使用C++导出的函数，同样需要将C++的函数进行导出。 c++为了支持重载函数，默认会对函数的名称进行mangle处理，这导致我们编写的函数和实际动态库导出的函数名不一致。

查看导出函数名命令：
$ clang++ add.cc -o add
$ nm add

添加extern之前：
0000000100003f30 T __Z3addii
0000000100008008 d __dyld_private
0000000100000000 T __mh_execute_header
0000000100003f50 T _main
                 U _printf
                 U dyld_stub_binder
可以看到myadd变成了__Z3addii
添加extern之后：
0000000100008008 d __dyld_private
0000000100000000 T __mh_execute_header
0000000100003f30 T _add
0000000100003f50 T _main
                 U _printf
                 U dyld_stub_binder
方法名称正常显示
emcc为了减小生成的wasm大小，对c++的代码进行了各种优化，其中有些优化会导致我们无法在js里正常的读取c++导出的函数，包括DCE和函数内联。

## DCE
emscripten为了保证生成的wasm尽可能小，会将很多没有使用的函数进行删除，既做了Dead code ellimination（DCE，类似于treeshaking)

EXPORTED_FUNCTIONS来保证add方法保留：
$ emcc -s EXPORTED_FUNCTIONS=_main,_add add.cc -o add.js

emcc的​EXPORTED_FUNCTIONS​的默认配置为['_main‘]

执行js代码可看到结果
```javascript
const Module = require("./add.js");
Module.onRuntimeInitialized = () => {
    Module._add(1,2);
}  
```
## 返回promise
添加命令 MODULARIZE=1
$ emcc -s EXPORTED_FUNCTIONS=_main,_add -s MODULARIZE=1 add.cc -o add.js
执行js代码可看到结果
```javascript
const _loadWasm = require('./add.js');     
const main = async () => {     
    const Module = await _loadWasm();
    console.log(Module._add(1,2));
}
main();
```

## 非int类型参数
Javascript和c++有完全不同的数据体系，Number是两者的唯一交集，因此JavaScript与C++相互调用的时候，都是通过Number类型进行交换。 
当我们需要在C++和Javascript传递其他类型时，需要先将其他类型转换成Number类型才可以进行交换。幸运的是emscripten为我们封装了一些功能函数来简化C++和Javascript之间的参数传递。 
我们可以通过allocateUTF8将一个js的string类型转换为number数组类型，同时可以通过UTF8ToString将number数组类型转换为js的string类型。

```javascript
const res = Module._addString(Module.allocateUTF8('hello'),Module.allocateUTF8('world'));     
console.log('res:', Module.UTF8ToString(res)) // 'hello world'
```
emscripten封装了两个函数用于做参数类型转换，cwrap和ccall:
$ emcc -s EXPORTED_FUNCTIONS=_main,_add,_addString -s MODULARIZE=1 -s EXPORTED_RUNTIME_METHODS=cwrap,ccall add.cc -o add.js

```javascript
const _loadWasm = require('./add.js');     
const main = async () => {     
    const Module = await _loadWasm();
    const concat = Module.cwrap('addString', 'string',['string','string']);
	// Module.ccall('addString','string,['string','string'],["hello", "word"]))
    console.log(concat("hello", "word"));
}
main();
```
