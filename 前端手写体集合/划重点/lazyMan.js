class lazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.sayHi();
    setTimeout(() => {
      this.next();
    }, 0);
  }

  sayHi(name) {
    const task = () => {
      console.log(`Hi! This is ${this.name}`);
      this.next();
    };
    this.tasks.push(task);
    return this;
  }

  sleep(time) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time / 1000} seconds`);
        this.next();
      }, time * 1000);
    };
    this.tasks.push(task);
    return this;
  }

  sleepFirst(time) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time / 1000} seconds`);
        this.next();
      }, time);
    };
    this.tasks.unshift(task);
    return this;
  }

  eat(food) {
    const task = () => {
      console.log(`Eat ${food}`);
      this.next();
    };
    this.tasks.push(task);
    return this;
  }

  next() {
    const task = this.tasks.shift();
    task && task();
  }
}

function LazyMan(name) {
  return new lazyMan(name);
}

LazyMan('jj').sleepFirst(2).eat('lunch').sleep(5).eat('dinner').sleep(3).eat('supper');
