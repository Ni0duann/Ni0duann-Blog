Function.prototype.myCall = function (context = window, ...args) {
  // 这里的 this 指向调用 customCall 的函数
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function')
  }
  context = context || window
  const fnSymbol = Symbol('fn')
  context[fnSymbol] = this
  const result = context[fnSymbol](...args)
  delete context[fnSymbol]
  return result
}

测试代码
function introduce(hobby, hobby2, hobby3) {
  console.log(
    `My name is ${this.name} and I like ${hobby}. I also like ${hobby2} and ${hobby3} . I am ${this.age} years old.`
  )
}

const person = { name: 'Alice' }
introduce.myCall(person, 'painting', 'reading', 'coding')
