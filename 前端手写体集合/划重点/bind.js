Function.prototype.myBind = function (context = window, ...args) {
  if (typeof fn !== 'function') {
    throw new TypeError('this is not a function')
  }
  const fn = this
  return function F(newArgs) {
    return fn.apply(this instanceof F ? this : context, [...args, ...newArgs])
  }
}
