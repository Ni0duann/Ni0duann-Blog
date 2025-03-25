const deepCopy = (obj, map = new Map()) => {
  let reg = /^(Function|Map|Set|Date|RegExp|Symbol|RegExp)$/
  if (reg.test(obj.constructor.name)) {
    return new obj.constructor(obj)
  }
  let result = obj instanceof Array ? [] : {}
  if (obj instanceof Object) {
    if (map.has(obj)) {
      return map.get(obj)
    } else {
      map.set(obj, result)
    }
    for (let key in obj) {
      result[key] = deepCopy(obj[key], map)
    }
  }
  return result
}

function myPoromiseAll(promises) {
  return new Promise((resolve, rejece) => {
    let ans = []
    let count = 0
    if (promises.length == 0) {
      resolve(ans)
      return
    }
    promises.foreach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          ans[index] = value
          count++
          if (count == promises.length) {
            resolve(ans)
          }
        })
        .catch((err) => {
          rejece(err)
        })
    })
  })
}

template('hello, {{name}}')({ name: 'world' }) // hello, world
