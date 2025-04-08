function curry(fn) {
  return function curryied(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curryied.apply(this, args.concat(args2))
      }
    }
  }
}
