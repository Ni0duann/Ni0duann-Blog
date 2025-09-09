class RequestParallelWithRetry {
  requestList;
  retryCount;
  map = {};
  result = [];
  parallelCount;
  constructor(requestList = [], retryCount = 3, parallelCount = 2) {
    this.requestList = requestList;
    this.retryCount = retryCount;
    this.parallelCount = parallelCount;
    // 需要给每个方法添加标记
    this.requestList.forEach((request, index) => {
      request._index = index;
      request._retryCount = 0;
      this.map[index] = request;
    });
    console.log(this.map);
  }
  send() {
    return new Promise((resolve) => {
      // 1. 将所有的网络请求进行包装，使得其返回结果中携带有_index
      // 2. 发送所有的网络请求
      let waitQueue = [...this.requestList];
      let sendQueue = [];

      const sendAllSettled = () => {
        waitQueue.splice(0, this.parallelCount).forEach((request) => {
          sendQueue.push(this._wrapRequest(request));
        });
        Promise.allSettled(sendQueue).then((value) => {
          // 3. 清除发送队列
          sendQueue = [];
          console.log('请求队列中的请求都完成了', value);
          // 4. 检查是否存在失败的请求
          value.forEach((result) => {
            if (result.status === 'fulfilled') {
              const { value, index } = result.value;
              this.result[index] = { value, status: 'fulfilled' };
            } else if (result.status === 'rejected') {
              const { reason, index } = result.reason;
              const request = this.map[index];
              if (request._retryCount < this.retryCount) {
                waitQueue.push(request);
                request._retryCount++;
              } else {
                this.result[index] = { reason, status: 'rejected' };
              }
            }
          });
          //  5. 检查队列中是否还需要发送请求
          if (waitQueue.length) {
            sendAllSettled();
          } else {
            resolve(this.result);
          }
        });
      };

      sendAllSettled();
    });
  }
  _wrapRequest(request) {
    return new Promise((resolve, reject) => {
      request()
        .then((value) => {
          resolve({
            value,
            index: request._index
          });
        })
        .catch((reason) => {
          reject({
            reason,
            index: request._index
          });
        });
    });
  }
}

new RequestParallelWithRetry([request1, request2, request3]).send();

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
      reject(222);
    }, 2000);
  });
}
function request3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('请求完毕333');
      reject(333);
    }, 3000);
  });
}
