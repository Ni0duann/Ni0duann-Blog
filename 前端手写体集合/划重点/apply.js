Function.prototype.myApply = function (context, args = []) {
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function');
  }
  const fnSymbol = Symbol('fn');
  context = context || window;
  context[fnSymbol] = this;
  let res = context[fnSymbol](...args);
  delete context[fnSymbol];
  return res;
};
// 测试代码
function greet(message) {
  console.log(`${message}, ${this.name}`);
}

const person = { name: 'John' };
greet.myApply(person, ['Hello']);
