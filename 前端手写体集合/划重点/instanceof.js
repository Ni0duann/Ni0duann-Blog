function myInstanceOf(target, constructor) {
  let proto = target.__proto__; // 拿到目标对象的原型
  while (proto) {
    // 循环
    if (proto === constructor.prototype) {
      // 当原型等于构造函数的原型时，返回true
      return true;
    }
    proto = proto.__proto__; // 否则继续向上查找
  }
  return false; // 直到原型链顶端，返回false
}
