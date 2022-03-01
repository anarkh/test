/*
 * @Author: lichenyang.anarkh
 * @LastEditors: lichenyang.anarkh
 * @Description: 
 * source ../../../../git/emsdk/emsdk_env.sh
 * emcc hello.c -o hello.js     
 * 以commonjs方式运行
 * $ node hello.js     hello world
 */
#include <stdio.h>
int main(){
    printf("hello world\n");
    return 0;
}