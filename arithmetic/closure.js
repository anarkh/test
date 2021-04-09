function closure() {
  let sum = 0;
  const temp = function (n){
    if (n) {
      sum += n;
      return temp;
    } else {
      return sum;
    }
  }
  return temp;
}

const cs = closure();
const sum = cs(1)(2)(3)(4)();

console.log(sum);
