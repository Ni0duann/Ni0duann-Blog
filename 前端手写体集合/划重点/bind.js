Function.prototype.myBind = function (context = globalThis, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function');
  }
  const fn = this;
  function F(...newArgs) {
    // 支持 new：如果 F 被 new 调用（this 是 F 的实例），则 this 指向新实例（作为构造函数），否则使用绑定的 context。
    return fn.apply(this instanceof F ? this : context, [...args, ...newArgs]);
  }
  // 保持原函数的 prototype 链，使得 new (bound) 时实例能访问到原函数的 prototype
  F.prototype = Object.create(fn.prototype);
  return F;
};

// 测试
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 测试 myBind
const obj = { value: 42 };
const BoundPerson = Person.myBind(obj, 'Alice');

console.log(BoundPerson); // 输出: [Function: F]

// 使用 new 调用绑定后的构造函数
const instance = new BoundPerson(25);

console.log(instance instanceof Person); // 输出: true
console.log(instance.name); // 输出: "Alice"
console.log(instance.age); // 输出: 25
