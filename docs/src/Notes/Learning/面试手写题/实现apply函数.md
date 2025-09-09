---
updateTime: '2025-09-09 11:40'
tags: 面试手写题
---
```javascript
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('need function');
  }
  let result = null;
  const args = arguments[1];
  context = context || window;
  context.fn = this;
  if (args) {
    result = context.fn(...args);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
```
