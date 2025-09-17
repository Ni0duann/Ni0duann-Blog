class EventEmitter {
  // 补全代码
  constructor() {
    this.events = {};
  }
  on(evnet, cb) {
    if (this.events[event]) {
      this.events[event].push(cb);
    } else {
      this.events[event] = [cb];
    }
  }
  emit(event) {
    if (this.events[event]) {
      this.events[event].forEach((cb) => cb(...arguments));
    }
  }
  off(event, cb) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((x) => x !== cb);
    }
  }
  once(event, cb) {
    const fn = (...args) => {
      cb(...args);
      this.off(event, fn);
    };
    this.on(event, fn);
  }
}
