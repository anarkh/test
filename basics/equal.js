const girl = {
  name: 'Conductors',
  age: 18,
};
const man = {
  name: 'John',
  age: 30,
  love: {
    girl
  }
};
const copy = man;

console.log(man === copy);
copy.age = 31;
console.log(man === copy);