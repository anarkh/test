/**
 * 依恋情节
 * 某个函数为了计算某个值，从另一个对象那里调用过半的取值函数
 */

// bad 
class People {
    constructor(name) {
        this.name = name;
    }

    getMoney(money) {
        console.log(`${money.type}:${money.count}`);
    }
}

// good
class Money {
    constructor(money) {
        this.type = money.type;
        this.count = money.count;
    }
    getMoney() {
        console.log(`${this.type}:${this.count}`);
    }
}

class People {
    constructor(name, money) {
        this.name = name;
        this.money = money;
    }
}
// people.money.getMoney()