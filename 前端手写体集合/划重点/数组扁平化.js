function flat(arr) {
  if (!Array.isArray(arr)) {
    return [arr]
  }
  let res = []
  for (let x of arr) {
    if (Array.isArray(x)) {
      res = res.concat(flat(x))
    } else {
      res.push(x)
    }
  }
  return res
}
console.log(flat([1, 2, [3, 4, [5, 6]]]))
