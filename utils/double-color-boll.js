const main = () => {
  const red = [];
  const blue = [];
  for (let i = 1; i < 34; i += 1) {
    red.push(i);
  }
  for (let i = 1; i < 17; i += 1) {
    blue.push(i);
  }
  let result = [];
  while (result.length < 6) {
    let i = 0;
    let hit = false;
    while (!hit) {
      if (Math.random() > 0.95) {
        result = result.concat(red.splice(i - 1, 1));
        hit = true;
      }
      i += 1;
      if (i === red.length) {
        i = 0;
      }
    }
  }
  result = result.sort((a, b) => a - b);
  let i = 0;
  let hit = false;
  while (!hit) {
    if (Math.random() > 0.95) {
      result = result.concat(blue.splice(i, 1));
      hit = true;
    }
    i += 1;
    if (i === blue.length) {
      i = 0;
    }
  }

  console.log(result);
};

main();
