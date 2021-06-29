/**
 * 纯数据类型
 * 类只有具体的数据项及修改数据项的方法，没有逻辑方法，建议把改动数据项逻辑的方法迁移到本纯数据类上
 */

// bad
class DataClass {
    constructor(number) {
        this.number = number;
    }

    getNumber() {
        return this.number;
    }
}


// good
class DataClass {
    constructor(number) {
        this.number = number;
    }

    getNumber() {
        // doSomething
        return this.number;
    }
}