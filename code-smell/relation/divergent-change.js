/**
 * 发散式变化
 * 类不够提炼，总受多种变化影响，多个本应单一职责的类被合成了一个大类才导致的
 */

// bad 
class Car {
    constructor(name) {
        this.name = name;
    }
    start(engin) {
        if(engin === '燃油') {
            // 燃油启动
        } else if(ngin === '电动') {
            // 电机启动
        }
    }
    driver() {
        this.start();
    }
    carName(engin) {
        if(engin === '燃油') {
            console.log('bmw');
        } else if(ngin === '电动') {
            console.log('tesla');
        }
    }
}

// good
class Engin {
    start() {
        // 启动
    }
    carName() {
        // 名称
    }
}

class GasolineEngin extends Engin {
    start() {
        // 燃油启动
    }
    carName(engin) {
        console.log('bmw');
    }
}
class ElectricEngine extends Engin {
    start() {
        // 电机启动
    }
    carName(engin) {
        console.log('tesla');
    }
}

class Car {
    constructor(name, engin) {
        this.name = name;
        this.engin = engin;
    }
    driver() {
        this.engin.start();
    }
    carName() {
        this.engin.carName();
    }
}