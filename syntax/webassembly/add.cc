#include <stdio.h>
#include <string.h>
#include <stdlib.h>

extern "C" {
    int add(int a, int b){
        int res = a + b;
        return res;
    }
    char *addString(char *a, char *b){
        char *res = (char *)malloc(strlen(a)+strlen(b)+1);
        strcpy(res, a);
        strcat(res, b);
        return res;
    }
    int main() {
        int res = add(1, 2);
        printf("res: %d\n", res);
        printf("res: %s\n", addString("hello", "word"));
        // cout << addString("hello", "word") << endl; 
    }
}