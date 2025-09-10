Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let completed = 0;
    const errors = [];

    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((value) => {
          resolve(value);
        })
        .catch((reason) => {
          errors.push(reason);
          completed++;
          if (completed === promises.length) {
            reject(new AggregateError(errors));
          }
        });
    });
  });
};

// 使用示例
const promises = [Promise.reject('error1'), Promise.reject('error2'), Promise.reject(3)];

Promise.myAny(promises)
  .then((value) => {
    console.log('First fulfilled value:', value); // 输出: First fulfilled value: 3
  })
  .catch((error) => {
    console.log('All promises were rejected:', error);
  });
