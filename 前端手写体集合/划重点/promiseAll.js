function myPromiseAll(iterable) {
  try {
    const list = Array.from(iterable);
    return new Promise((resolve, reject) => {
      const len = list.length;
      if (len === 0) return resolve([]);
      const results = new Array(len);
      let remaining = len;

      list.forEach((item, i) => {
        Promise.resolve(item).then(
          (value) => {
            results[i] = value;
            if (--remaining === 0) resolve(results);
          },
          (err) => reject(err) // 直接把 reject 传入，首个拒绝会结束
        );
      });
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

Promise.myPromiseAll = function (promises) {
  try {
    const list = Array.from(promises);
    let n = list.length;
    if (n === 0) return Promise.resolve([]);
    return new Promise((resolve, reject) => {
      const results = new Array(n);
      list.forEach((promise, index) => {
        Promise.resolve(promise).then(
          (res) => {
            results[index] = res;
            if (--n === 0) resolve(results);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

let promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(), Promise.resolve(4)];

Promise.myPromiseAll(promises)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
// 重点：
// 返回一个Promise对象实例，
// count统计
// forEach遍历promises数组，同时执行promise.then()
// catch在promise.then()后面捕获
// 判断在then里面执行
