Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    for (const p of promises) {
      Promise.resolve(p).then(resolve).catch(reject);
    }
  });
};
// 模拟一个异步请求
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('数据加载成功'), 3000);
  });
}
// 超时控制器
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('请求超时')), ms);
  });
}
// 使用race实现超时控制
Promise.myRace([fetchData(), timeout(2000)])
  .then(console.log)
  .catch(console.error); // 会输出"请求超时"
