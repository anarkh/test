/**
 * 数据泥团
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
        this.money = new Money();
    }
}
