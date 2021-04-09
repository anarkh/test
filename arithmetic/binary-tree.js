function balance(root) {
  if (!root) return true;
  const leftBalance = deep(root.left);
  const rightBalance = deep(root.right);
  if (Math.abs(leftBalance - rightBalance) > 1) {
    return false;
  } else {
    return balance(root.left) && balance(root.right);
  }
}

function deep(root) {
  if (!root) return 0;
  const leftDeep = deep(root.left);
  const rightDeep = deep(root.right);
  return Math.max(leftDeep, rightDeep) + 1;
}
