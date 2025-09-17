// 三个核心函数,start,setPromise,run
// start: 输入URL将并发池填满,并执行最快的一个(Promise.race)
// setPromise:将输入的URL包装成请求,并正式加入并发池
// run:每当并发池中完成一个任务，就再次塞入一个任务,并执行

class PromisePool {
  constructor(max, fn, urls) {
    this.max = max; // 最大并发数
    this.fn = fn; // 请求函数
    this.pool = []; // 并发池
    this.urls = urls; // 剩余的请求地址
  }

  start() {
    // 填满并发池
    while (this.pool.length < this.max && this.urls.length) {
      this.setPromise(this.urls.shift());
    }
    this.run(Promise.race(this.pool));
  }

  setPromise(url) {
    if (!url) return;
    const promise = this.fn(url);
    this.pool.push(promise);
    console.log('并发池:', this.pool.length, '剩余请求:', this.urls.length);
    promise.finally(() => {
      this.pool = this.pool.filter((p) => p !== promise);
      console.log('并发池:', this.pool.length, '剩余请求:', this.urls.length);
    });
  }

  run(race) {
    race.then(() => {
      if (this.urls.length) {
        this.setPromise(this.urls.shift());
        this.run(Promise.race(this.pool));
      }
    });
  }
}

function request1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('请求完毕111');
      resolve(111);
    }, 1000);
  });
}
function request2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('请求完毕222');
      resolve(222);
    }, 2000);
  });
}
function request3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('请求完毕333');
      resolve(333);
    }, 3000);
  });
}

const arr = new PromisePool(
  2,
  (url) => {
    if (url === 'url1') {
      return request1();
    } else if (url === 'url2') {
      return request2();
    } else if (url === 'url3') {
      return request3();
    }
  },
  ['url1', 'url2', 'url3']
);

arr.start();
