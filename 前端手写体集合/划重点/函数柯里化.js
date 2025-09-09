// 定义占位符标识
const _ = Symbol('PLACEHOLDER');

function curry(fn) {
  return function curried(...args) {
    // 检查是否满足执行条件：参数足够且无占位符
    const readyToExecute = args.length >= fn.length && !args.slice(0, fn.length).includes(_);

    if (readyToExecute) {
      return fn.apply(this, args.slice(0, fn.length));
    } else {
      return function (...nextArgs) {
        // 替换占位符：用nextArgs填充args中的占位符
        const mergedArgs = args
          .map((arg) => (arg === _ && nextArgs.length ? nextArgs.shift() : arg))
          .concat(nextArgs);

        return curried.apply(this, mergedArgs);
      };
    }
  };
}

// 使用示例
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(_, 3)(2)); // 6
console.log(curriedAdd(_, 2)(1)(3)); // 6
console.log(curriedAdd(_, _, 3)(1)(2)); // 6

// 柯里化变形，函数柯里化后可以无限传参，最后调用sum方法计算总和  （快手真题）

function myAdd(num) {
  let result = [num];
  function curryied(num2) {
    result.push(num2);
    return curryied;
  }
  curryied.sum = function () {
    console.log(result.reduce((a, b) => a + b, 0));
  };
  return curryied;
}

myAdd(1)(2)(3).sum(); // 6
