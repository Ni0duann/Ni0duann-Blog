function deepCopyAdvanced(obj, map = new WeakMap()) {
  let reg = /^(Function|Date|RegExp|Map|Set)$/;
  if (reg.test(obj.constructor.name)) {
    // 正则表达式匹配
    return new obj.constructor(obj);
  }
  let newObj = Array.isArray(obj) ? [] : {};
  if (obj instanceof Object) {
    if (map.has(obj)) {
      // 循环引用
      return map.get(obj);
    } else {
      // 没有循环引用
      map.set(obj, newObj); // 缓存
      for (let key in obj) {
        // 遍历
        if (obj.hasOwnProperty(key)) {
          // 自身属性
          newObj[key] = deepCopyAdvanced(obj[key], map); // 递归
        }
      }
    }
  }
  return newObj;
}
// 测试循环引用
const obj1 = { a: 1, b: { c: 2 } };
obj1.b.d = obj1;
const obj2 = deepCopyAdvanced(obj1);
console.log(obj2);
console.log(obj2.b.d === obj2);

function mydeep(obj) {
  return JSON.parse(JSON.stringify(obj)); // 序列化反序列化
}
