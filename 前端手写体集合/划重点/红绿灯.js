function red() {
  console.log('red');
}

function green() {
  console.log('green');
}

function yellow() {
  console.log('yellow');
}

function light(cb, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb();
      resolve();
    }, wait);
  });
}

async function start() {
  while (true) {
    await light(red, 3000);
    await light(green, 2000);
    await light(yellow, 1000);
  }
}

start();
