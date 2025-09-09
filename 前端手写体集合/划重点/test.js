class Queue {
  constructor() {
    this.tasks = [];
  }
  todelay = 0;
  run() {
    this.tasks.forEach((task) => {
      this.todelay += task.delay || 0;
      setTimeout(task.fn, this.todelay);
    });
  }
  push(task) {
    this.tasks.push(task);
  }
  unshift(task) {
    this.tasks.unshift(task);
  }
}

class lazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = new Queue();
    this.say();
    setTimeout(() => {
      this.tasks.run();
    });
  }
  say(time = 0) {
    setTimeout(() => {
      console.log(`Hi, I am ${this.name}`);
    }, time);
  }
  sleep(time) {
    this.tasks.push({
      fn: () => {
        console.log(`wait ${time} seconds`);
      },
      delay: time
    });
    return this;
  }
  eat(food) {
    this.tasks.push({
      fn: () => {
        console.log(`I am eating ${food}`);
      },
      delay: 0
    });
    return this;
  }
  sleepFirst(time) {
    this.tasks.unshift({
      fn: () => {
        console.log(`wait ${time} seconds`);
      },
      delay: time
    });
    return this;
  }
}

new lazyMan('Hank').sleep(1000).eat('dinner').sleepFirst(2000).eat('supper');
