function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    let count = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          result[index] = res;
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    let ans = [];
    let count = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          ans[index] = res;
          count++;
          if (count === promises.length) {
            resolve(ans);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

// 重点：
// 返回一个Promise对象实例，
// count统计
// forEach遍历promises数组，同时执行promise.then()
// catch在promise.then()后面捕获
// 判断在then里面执行
