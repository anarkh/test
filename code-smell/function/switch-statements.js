/**
 * 重复的switch
 */

// bad
const switchStatements = (count) => {
    switch (count) {
        case 0:
            return 'im 0';
        case 1:
            return 'im 1';
        default:
            return 'im god';
    }
}

// good 表驱动
const switchArray = ['im 0', 'im 1'];
const switchStatements = (count) => {
    return switchArray[count] || 'im god';
}


// good 责任链
class SwitchStatements{
    constructor(count) {
        this.count = count;
    }

    switchFirst() {
        if(count === 0) {
            return 'im 0';
        }
        return this;
    }

    switchSecond() {
        if(count === 1) {
            return 'im 1';
        }
        return this;
    }

    switchDefault() {
        if(count === 1) {
            return 'im 1';
        }
        return this;
    }
}
const switchStatements = new SwitchStatements(1);
const result = switchStatements.switchFirst().switchSecond().switchDefault();