function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

const debounceTest = debounce(() => {
  console.log('debounce')
}, 1000)

setInterval(() => {
  debounceTest()
}, 1001)
