function myCreate(proto) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('proto is not a object or function')
  }
  let fn = function () {} // 定义一个空函数
  fn.prototype = proto // 将空函数的原型指向proto
  return new fn() // 返回一个新对象，该对象的原型指向proto，即fn.prototyp
}
