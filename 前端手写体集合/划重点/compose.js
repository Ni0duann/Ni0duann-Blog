function compose(...fns) {
  if (fns.length === 0) {
    return (arg) => arg;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return fns.reduce(
    (acc, fn) =>
      (...args) =>
        acc(fn(...args))
  );
}

// 使用示例
const fn = compose(
  (x) => x + 1,
  (x) => x * 2,
  (x) => x - 3
);

console.log(fn(5)); // 输出结果
