const arr = [];
for(let i = 0; i < 10; i++) {
  arr.push(parseInt(Math.random()*10));
}
console.log(arr);

const quickSort = (left, right) => {
  if(left >= right) {
    return;
  }
  const base = arr[right - 1];
  let i = left;
  let j = right;
  while (i < j) {
    while( i < j && arr[i] <= base) {
      i++;
    }
    arr[j] = arr[i];
    while(i < j && arr[j] >= base) {
      j--;
    }
    arr[i] = arr[j];
  }
  arr[j] = base;
  quickSort(left, j - 1);
  quickSort(j + 1, right);
}

quickSort(0, arr.length);
console.log(arr);
