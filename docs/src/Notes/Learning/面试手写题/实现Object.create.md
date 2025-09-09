---
updateTime: '2025-09-09 11:40'
tags: 面试手写题
---
创建一个新对象，使用现有的对象来提供新创建的对象的**proto**。 --MDN

```js
function myObjectCreate(proto) {
  // 首先检查传入的 proto 是否为 null 或对象
  if (typeof proto !== 'object' && proto !== null) {
    throw new TypeError('Object prototype may only be an Object or null');
  }
  // 创建一个新的构造函数
  function F() {}
  // 将构造函数的原型指向传入的原型对象
  F.prototype = proto;
  // 使用 new 关键字创建该构造函数的实例
  F.prototype.constructor = F;
  return new F();
}
```
