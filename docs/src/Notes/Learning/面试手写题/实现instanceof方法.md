---
updateTime: '2025-09-09 11:40'
tags: 面试手写题
---
```js
function myinstanceof(obj, constructor) {
  //获取构造函数的prototype属性
  const prototype = constructor.prototype;
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeof(proto);
  }
  return false;
}
```
