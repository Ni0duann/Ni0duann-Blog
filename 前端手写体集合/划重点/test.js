// class Queue {
//   constructor() {
//     this.tasks = [];
//   }
//   todelay = 0;
//   run() {
//     this.tasks.forEach((task) => {
//       this.todelay += task.delay || 0;
//       setTimeout(task.fn, this.todelay);
//     });
//   }
//   push(task) {
//     this.tasks.push(task);
//   }
//   unshift(task) {
//     this.tasks.unshift(task);
//   }
// }

// class lazyMan {
//   constructor(name) {
//     this.name = name;
//     this.tasks = new Queue();
//     this.say();
//     setTimeout(() => {
//       this.tasks.run();
//     });
//   }
//   say(time = 0) {
//     setTimeout(() => {
//       console.log(`Hi, I am ${this.name}`);
//     }, time);
//   }
//   sleep(time) {
//     this.tasks.push({
//       fn: () => {
//         console.log(`wait ${time} seconds`);
//       },
//       delay: time
//     });
//     return this;
//   }
//   eat(food) {
//     this.tasks.push({
//       fn: () => {
//         console.log(`I am eating ${food}`);
//       },
//       delay: 0
//     });
//     return this;
//   }
//   sleepFirst(time) {
//     this.tasks.unshift({
//       fn: () => {
//         console.log(`wait ${time} seconds`);
//       },
//       delay: time
//     });
//     return this;
//   }
// }

// new myLazyMan('Hank').sleep(1000).eat('dinner').sleepFirst(2000).eat('supper');

class myLazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.say();
    Promise.resolve().then(() => this.run());
  }
  _enqueue(fn, delay = 0, unshift = false) {
    this.tasks[unshift ? 'unshift' : 'push'](async () => {
      delay ? await new Promise((resolve) => setTimeout(resolve, delay)) : null;
      await fn();
    });
    return this;
  }
  say() {
    return this._enqueue(() => {
      console.log(`Hi, I am ${this.name}`);
    });
  }
  eat(food) {
    return this._enqueue(() => {
      console.log(`I am eating ${food}`);
    });
  }
  sleep(time) {
    return this._enqueue(() => {
      console.log(`wait ${time} seconds`);
    }, time);
  }
  sleepFirst(time) {
    return this._enqueue(
      () => {
        console.log(`wait ${time} seconds`);
      },
      time,
      true
    );
  }
  async run() {
    if (this.tasks.length) {
      const task = this.tasks.shift();
      task().then(() => {
        this.run();
      });
    }
  }
}

new myLazyMan('Hank').sleep(1000).eat('dinner').sleepFirst(2000).eat('supper');
