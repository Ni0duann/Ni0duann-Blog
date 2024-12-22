## Iteration(迭代)

可迭代的东西内部都有一个东西叫迭代器，迭代器向外暴露了一个next方法，当我们调用这个next方法的时候都会给我们返回个结果对象，结果对象里面包含了两个属性，分别为value和done。value记录他的值，done记录有无完成。

```
//方法1
var it = 'aaabbbb';
for (let val of it) {
	console.log(val)
}

//方法2
var vals = [...it]
```

#### Iterables(可迭代对象)

js标准当我们迭代一个可迭代对象的时候会创建一个迭代器实例。

 常用的Strings,arrays,maps,sets,and others.

所有的可迭代对象都有三个api：分别是**key(),values(),and entries().**其中entries是全部，即包含key和value

#### 手写一个迭代器



