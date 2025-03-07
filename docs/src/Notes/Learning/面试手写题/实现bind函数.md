- 先判断调用者是否为函数
- 缓存当前需要bind的函数，就是上面的调用者，也是是bind函数的上下文
- 返回一个函数，利用闭包原理实现对this的保存
- 函数内部用apply函数来处理函数调用

- - 需要判断函数作为构造函数的情况，这个时候的this就是当前调用这个闭包函数的this
  - 作为普通函数，直接使用传入的上下文就好了

```javascript
Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeErr('need function')
    }
    let args = [...arguments].slice(1);
    let fn = this;
    return function F() {
        return fn.apply(this instanceof F ? this : context,args.concat(...arguments));
    }
}
```

