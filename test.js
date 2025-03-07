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
