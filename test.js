// // const { rejects } = require('assert')
// // const { resolve } = require('path')

// // const deepCopy = (obj, map = new Map()) => {
// //   let reg = /^(Function|Map|Set|Date|RegExp|Symbol|RegExp)$/
// //   if (reg.test(obj.constructor.name)) {
// //     return new obj.constructor(obj)
// //   }
// //   let result = obj instanceof Array ? [] : {}
// //   if (obj instanceof Object) {
// //     if (map.has(obj)) {
// //       return map.get(obj)
// //     } else {
// //       map.set(obj, result)
// //     }
// //     for (let key in obj) {
// //       result[key] = deepCopy(obj[key], map)
// //     }
// //   }
// //   return result
// // }

// // function myPoromiseAll(promises) {
// //   return new Promise((resolve, rejects) => {
// //     let result = []
// //     let count = 0
// //     if (promises.length === 0) {
// //       resolve(ans)
// //       return
// //     }
// //     promises.forEach((promise, index) => {
// //       Promise.resolve(promise)
// //         .then((res) => {
// //           result[index] = res
// //           count++
// //           if (count === promises.length) {
// //             resolve(result)
// //           }
// //         })
// //         .catch((err) => {
// //           rejects(err)
// //         })
// //     })
// //   })
// // }

// // template('hello, {{name}}')({ name: 'world' }) // hello, world
// // function template(str, data) {
// //   return str.replace(/\{\{(.+?)\}\}/g, (_, key) => data[key.trim()])
// // }

// const a = function () {
//   this.b = 1
// }
// a.prototype.b = 2
// const c = new a()
// var b = 3
// a()
// console.log(b)
// console.log(c.b)

// // const promise1 = new Promise((resolve, rejects) => {
// //   console.log(1)
// // }

// function aa(arr) {
//   let tree = {}
//   function dfs() {
//     for (let x of arr) {
//       let a = x.split('/')
//       let c = tree
//       for (let b of a) {
//         if (!c[b]) {
//           c[b] = {}
//         }
//         c = c[b]
//       }
//     }
//   }
//   dfs()
//   return tree
// }

// const input = [
//   'Electronics/Computers/Laptops',
//   'Electronics/Computers/Desktops',
//   'Electronics/Phones/Smartphones',
//   'Home/Kitchen/Appliances',
//   'Home/Furniture/Sofas'
// ]
// console.log(aa(input))

const promise1 = new Promise((resolve, rejects) => {
  console.log(1)
})

promise1.then(() => {
  console.log(3)
})

console.log(1, promise1)

const fn = () =>
  new Promise((resolve, reject) => {
    console.log(2)
    resolve('success')
  })

fn().then((res) => {
  console.log(res)
})

console.log('start')
