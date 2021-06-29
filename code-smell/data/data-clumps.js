/**
 * 数据泥团
 * 类不够抽象，本质上应该抽象成多个类的数据，放在一个大类里面，类太大
 */

// bad
class Human {
    constructor() {
        this.age = 1;
        this.sex = 'male';
        this.money = 100;
    }
}

// good
class Money {
    constructor() {
        this.money = 100;
    }
}

class Human {
    constructor() {
        this.age = 1;
        this.sex = 'male';
    }
}
