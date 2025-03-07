```js
function myinstanceof(obj, constructor) {
  //获取构造函数的prototype属性
  const prototype = constructor.prototype
  let proto = Object.getPrototypeOf(obj)
  while (proto) {
    if (proto === prototype) {
      return true
    }
    proto = Object.getPrototypeof(proto)
  }
  return false
}
```
