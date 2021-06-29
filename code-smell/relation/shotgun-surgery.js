/**
 * 霰弹式修改
 * 一处修改处处修改，表示本来应该放在一个类里的n个数据项，拆散了成多个类，到处都是。
 */

// bad 多个方法/类使用同一个数据库地址，如果需要修改地址，多个方法/类都要改
const updateDB = () => {
    const db = '127.0.0.1';
    // link(db)
    // update(db)
}

const selectDB = () => {
    const db = '127.0.0.1';
    // link(db)
    // select(db)
}

// good
const linkDB = () => {
    const db = '127.0.0.1';
    // link(db)
}

const updateDB = () => {
    linkDB()
    // update(db)
}

const selectDB = () => {
    linkDB()
    // select(db)
}
