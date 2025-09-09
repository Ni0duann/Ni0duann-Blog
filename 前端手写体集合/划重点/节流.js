function throttle(fn, delay) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}

const throttleTest = throttle(() => {
  console.log('throttle');
}, 1000);

setInterval(() => {
  throttleTest();
}, 60);
