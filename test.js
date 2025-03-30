const { rejects } = require('assert')
const { resolve } = require('path')

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
  return new Promise((resolve, rejects) => {
    let result = []
    let count = 0
    if (promises.length === 0) {
      resolve(ans)
      return
    }
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((res) => {
        result[index] = res
        count++
        if (count === promises.length) {
          resolve(result)
        }
      }) 
      .catch(err => {
        rejects(err)
      })
    })
  })
}

template('hello, {{name}}')({ name: 'world' }) // hello, world
function template(str, data) {
  return str.replace(/\{\{(.+?)\}\}/g, (_, key) => data[key.trim()])
}
