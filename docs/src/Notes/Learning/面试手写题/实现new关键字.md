---
updateTime: '2025-09-09 11:40'
tags: 面试手写题
---
1. 创建一个新对象。
2. 将新对象的原型指向构造函数的 `prototype` 属性。
3. 执行构造函数，并将 `this` 绑定到新对象上。
4. 如果构造函数返回一个对象，则返回该对象；否则，返回新创建的对象。

```javascript
function myNew(constructor, ...args) {
  //创建一个新对象
  const newObj = {};
  //将新对象的原型只想构造函数的prototype属性
  newObj.__proto__ = constructor.prototype;
  //执行构造函数，必将this绑定this上
  const result = constructor.apply(newObj, args);
  return typeof result === 'object' && result !== null ? result : newObj;
}
```
