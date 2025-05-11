export class TaskQueue {
  private queue: (() => Promise<any>)[] = []
  private activeCount = 0
  private maxConcurrent: number

  constructor(maxConcurrent: number) {
    this.maxConcurrent = maxConcurrent
  }

  public getPending(): number {
    return this.queue.length
  }

  public getActive(): number {
    return this.activeCount
  }

  public clear(): void {
    this.queue = []
  }

  private next() {
    if (this.queue.length === 0 || this.activeCount >= this.maxConcurrent) {
      return
    }
    const task = this.queue.shift()
    if (task) {
      this.activeCount++
      task().finally(() => {
        this.activeCount--
        this.next()
      })
    }
  }

  public add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const task = async () => {
        try {
          resolve(await fn())
        } catch (error) {
          reject(error)
        }
      }
      this.queue.push(task)
      this.next()
    })
  }
}

// 创建队列实例，最大并发数为2
const queue = new TaskQueue(2);

// 模拟异步任务
const createTask = (id: number) => {
  return () => new Promise<string>((resolve) => {
    const duration = Math.random() * 2000;
    setTimeout(() => {
      console.log(`Task ${id} completed`);
      resolve(`Task ${id} result`);
    }, duration);
  });
};

// 添加任务
async function runTasks() {
  console.log('开始执行任务');

  // 添加5个任务
  for (let i = 1; i <= 5; i++) {
    queue.add(createTask(i))
      .then(result => console.log(result));
    
    console.log(`Task ${i} added, pending: ${queue.getPending()}, active: ${queue.getActive()}`);
  }
}

runTasks();