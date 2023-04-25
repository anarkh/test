const obj = new Promise((resolve) => {
  setTimeout(() => {
    const b = Math.random();
    resolve(b);
  }, 1000);
});

function test2() {
  let o;
  if (o) {
    return o;
  }
  o = obj;
  return o;
}

const test3 = test2();

const main = async () => {
  console.log(test3);
  const test4 = await test3;
  const test5 = await test3;
  console.log(test4);
  console.log(test5);
};
main();
