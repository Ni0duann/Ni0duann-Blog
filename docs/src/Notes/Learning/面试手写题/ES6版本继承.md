---
updateTime: '2025-09-09 11:40'
tags: 面试手写题
---
```javascript
class Super {
  constructor(foo) {
    this.foo = foo;
  }
  printFoo() {
    console.log(this.foo);
  }
}

class sub extends Super {
  constructor(foo, bar) {
    super(foo);
    this.bar = bar;
  }
}
```
