```javascript
function hardMan(name) {
  // sleep函数
  function sleep(duration) {
    var start = Date.now();
    while (Date.now() - start < duration * 1000) {}
    console.log(`Wait ${duration} seconds.`);
  }
  setTimeout(() => {
    console.log(`Hi! I am ${name}.`); // 异步代码
  }, 0);
  this.study = function (project) {
    setTimeout(() => {
      console.log(`I am studying ${project}.`); // 异步代码
    }, 0);
    return this;
  };
  this.rest = function (duration) {
    setTimeout(() => {
      sleep(duration); // 异步代码
    }, 0);
    return this;
  };
  this.restFirst = function (duration) {
    sleep(duration); // 异步代码
    return this;
  };
  return this;
}

hardMan("潘潘").restFirst(3).study("敲码");
```

