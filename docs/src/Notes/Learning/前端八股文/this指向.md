## 什么是this

在JavaScript中，他代表的是当**前函数执行上下文中的执行环境**。即在某些情况下，this指向的是什么对象，取决于函数如何别调用。

与其他语言相比，函数的 `this` 关键字在 `JavaScript` 中的表现略有不同，此外，在严格模式和非严格模式之间也会有一些差别。**在全局上下文中**，无论是严格模式或者非严格模式，**`this` 都指向顶层对象（浏览器中是 window）**。

## 总结

1. **全局作用域中的 `this`**
   - 当在全局作用域中调用一个函数时，`this` 通常指向全局对象（在浏览器中是 `window`，在 Node.js 中是 `global`）。
2. **作为普通函数调用时的 `this`**
   - 当一个函数被直接调用时（不是作为一个对象的方法），`this` 通常指向全局对象（非严格模式下）或者 `undefined`（严格模式下）。
3. **作为对象方法调用时的 `this`**
   - 当一个函数作为对象的一个方法被调用时，`this` 通常指向那个对象。
4. **构造函数中的 `this`**
   - 使用 `new` 关键字调用构造函数时，`this` 指向新创建的对象实例。
5. **事件处理程序中的 `this`**
   - 当一个函数作为事件处理程序被调用时，`this` 通常指向触发事件的元素。
6. **箭头函数中的 `this`**
   - 箭头函数不会绑定自己的 `this`，而是继承自外围函数的作用域中的 `this`。
7. **使用 `.call`, `.apply`, `.bind` 改变 `this`**
   - 可以使用这些方法显式地设置函数执行时的 `this` 值。

为了描述this 的不同绑定方式，程序员们达成了共识，给this的绑定也分为了一下几类

## 社区里广泛使用的术语

### 默认绑定

当函数独立调用时，this指向全局对象（在浏览器环境中为window对象）。

示例：

```javascript
javascript 代码解读复制代码复制
function sayName() {
  console.log(this.name);
}

var name = '全局名称';
sayName(); // 输出：全局名称
```

注意：当这里是严格模式的时候，会访问undefined导致TypeError

### 隐式绑定

当函数作为对象的方法调用时，this指向该对象。

```javascript
javascript 代码解读复制代码var person = {
  name: '张三',
  sayName: function() {
    console.log(this.name);
  }
};

person.sayName(); // 输出：张三
```

### 函数调用中的`this`

当一个函数作为普通函数调用时，`this`的行为取决于上下文：

- 非严格模式下，`this`指向全局对象。
- 严格模式下，`this`为`undefined`。

```javascript
javascript 代码解读复制代码function greet() {
    console.log(this);
}

greet(); // 输出: window (非严格模式) 或 undefined (严格模式)
```

#### 箭头函数中的`this`

箭头函数不绑定自己的`this`。它们继承外部函数或全局作用域中的`this`。

```javascript
javascript 代码解读复制代码const person = {
    name: 'Alice',
    greet: () => {
        console.log('Hello, ' + this.name);
    }
};

person.greet(); // 输出: Hello, undefined (因为这里的this是全局的)
```

### new绑定`this`

在构造函数中，`this`指向新创建的对象实例。

```javascript
javascript 代码解读复制代码function Person(name) {
    this.name = name;
}

const alice = new Person('Alice');
console.log(alice.name); // 输出: Alice
```

### 显式绑定

通过call、apply和bind方法，可以显式指定函数的this指向。

示例：

```javascript
javascript 代码解读复制代码function sayName(age) {
  console.log(this.name + '，年龄：' + age);
}

var person = {
  name: '李四'
};

sayName.call(person, 25); // 输出：李四，年龄：25
```
