```
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
```
