function myNew(constructor, ...args) {
  //创建一个新对象
  let newObj = {};
  //对象的原型指向构造函数的原型
  newObj.__proto__ = constructor.prototype;
  //执行构造函数
  let res = constructor.apply(newObj, args);
  return res instanceof Object && res !== null ? res : newObj;
}

// 重点：
// constructor是个函数
// apply显示绑定在newObj上
