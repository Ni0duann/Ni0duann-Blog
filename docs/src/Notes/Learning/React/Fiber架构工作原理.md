## 双缓存

> [!NOTE]
>
> 在 React 中，双缓存是一种用于解决 UI 渲染过程中**闪烁和视觉不连续**的技术。传统的渲染过程中，更新操作会直接修改 DOM，导致在更新过程中用户可能会看到中间状态的 UI，造成视觉上的不连续和不稳定。双缓存技术通过在内存中**维护两份 UI 状态**，**一份用于渲染当前帧，另一份用于计算下一帧的状态**，从而**避免了直接在 DOM** 上进行更新操作。

#### 双缓存Fiber树

在`React`中最多会同时存在两棵`Fiber树`。当前屏幕上显示内容对应的`Fiber树`称为`current Fiber树`，正在内存中构建的`Fiber树`称为`workInProgress Fiber树`。

`current Fiber树`中的`Fiber节点`被称为`current fiber`，`workInProgress Fiber树`中的`Fiber节点`被称为`workInProgress fiber`，他们通过`alternate`属性连接。

```javascript
currentFiber.alternate === workInProgressFiber
workInProgressFiber.alternate === currentFiber
```

`React`应用的根节点通过使`current`指针在不同`Fiber树`的`rootFiber`间切换来完成`current Fiber`树指向的切换。

即当`workInProgress Fiber树`构建完成交给`Renderer`渲染在页面上后，**应用根节点的`current`指针指向`workInProgress Fiber树`**，此时`workInProgress Fiber树`就变为`current Fiber树`。

每次状态更新都会产生新的`workInProgress Fiber树`，通过`current`与`workInProgress`的替换，完成`DOM`更新。

## 时间切片

#### 什么是时间切片

时间切片是一种将任务拆分成多个小片段，在浏览器空闲时间执行的技术。在 React 中，时间切片被用于将渲染任务拆分成多个小任务，并在多个帧之间动态调度执行，以提高页面的响应速度和用户体验。

1. **任务队列（Task Queue）**: React 将所有的更新操作（如状态更新或属性更改）封装成任务，并放入一个任务队列中。
2. **执行任务**: React 从任务队列中取出任务并执行。在执行过程中，React 会检查当前任务的执行时间。
3. **时间检查**: 如果任务的执行时间超过了一个预设的阈值（默认是5毫秒），React 会中断当前任务的执行。
4. **让出线程**: React 使用 `MessageChannel` 和 `postMessage` API 来让出执行线程。这意味着浏览器可以在此时处理其他任务，如用户输入或动画。
5. **继续执行**: 一旦浏览器处理完其他任务，它将通过 `onmessage` 事件来继续执行之前中断的任务。
6. **循环执行**: 这个过程会一直重复，直到任务队列中的所有任务都被执行完毕。

### 优先级调度

#### 不同优先级的任务

```arduino
arduino 代码解读复制代码// 无优先级任务
export const NoPriority = 0;
// 立即执行任务
export const ImmediatePriority = 1;
// 用户阻塞任务
export const UserBlockingPriority = 2;
// 正常任务
export const NormalPriority = 3;
// 低优先级任务
export const LowPriority = 4;
// 空闲执行任务
export const IdlePriority = 5;
```

在 React 中，任务被划分为不同的优先级，以便根据任务的重要性进行调度。通常情况下，React 将任务分为以下几个优先级：

- **同步任务**：最高优先级的任务，通常用于处理用户交互事件和页面加载过程中的同步操作。
- **异步任务**：中等优先级的任务，包括普通的更新任务和网络请求等异步操作。
- **空闲任务**：最低优先级的任务，通常用于执行一些不紧急的任务，如日志记录或统计信息收集等。

#### 调度器的工作方式

调度器是 React 中负责任务调度的核心组件，它根据任务的优先级和类型来动态地安排任务的执行顺序。调度器会监视浏览器的空闲时间，并根据当前任务队列中的任务优先级，决定在何时执行哪些任务。

## React Fiber 与 Concurrent Mode

#### 什么是 Concurrent Mode

Concurrent Mode 是 React Fiber 的一项重要特性，它是一种新的渲染模式，旨在提高 React 应用的性能和用户体验。在 Concurrent Mode 下，React 能够在多个优先级任务之间动态地调度执行，使得高优先级任务能够优先得到处理，从而提高了页面的响应速度和用户交互的流畅度。

#### Concurrent Mode 如何利用 Fiber

Concurrent Mode 利用了 Fiber 架构的增量渲染和时间切片技术，实现了多优先级任务的动态调度。通过 Fiber 架构，React 能够将渲染任务拆分成多个小任务，并在浏览器空闲时间执行，从而最大限度地利用浏览器的资源，提高了渲染效率和用户体验。

#### Concurrent Mode 的实际应用

##### batchedUpdates

在React的事件处理过程中，如果连续触发多次状态更新，这些更新可能会被智能地合并为单一的更新操作，以避免不必要的渲染。例如，以下代码片段：

```scss
// class
onClick() {
  this.setState({ count: 1 });
  this.setState({ flag: false });
  this.setState({ count: 2 });
}

// function
const [count, setCount] = useState(0);
const [flag, setFlag] = useState(false);

function handleClick() {
    setCount(c => c + 1); // 不会重新render
    setFlag(f => !f); // 不会重新render
    // 合并后才会 重新render
}
```

尽管看起来我们进行了三次状态更新，实际上，React 会将这些更新合并，只触发一次组件的重新渲染。这种优化策略被称为 `batchedUpdates`。

`batchedUpdates` 在React早期版本就已经存在，但其早期实现有一定的局限性，主要是它不能合并那些脱离当前上下文环境的更新。

在 `Concurrent Mode` 这种模式下，状态更新的合并不再局限于当前上下文，而是根据更新的优先级来决定是否合并。这意味着，即使更新操作发生在不同的上下文或异步操作中，只要它们的优先级允许，这些更新仍然可以被有效地合并。 这种基于优先级的更新合并策略，不仅提高了应用的响应速度，还使得状态管理更加高效和灵活。

##### Suspense

[Suspense](https://link.juejin.cn?target=https%3A%2F%2Freact.dev%2Freference%2Freact%2FSuspense%23) 是一种用于在组件树中等待异步加载内容的机制，能够在数据加载完成之前显示占位符或 loading 界面，从而提高用户体验。

##### Lazy Loading

[Lazy Loading](https://link.juejin.cn?target=https%3A%2F%2Freact.dev%2Freference%2Freact%2Flazy%23) 是一种延迟加载组件或资源的技术，能够提高页面的加载速度和响应速度，减少初次加载时的资源占用和等待时间。

##### useDeferredValue

[useDeferredValue](https://link.juejin.cn?target=https%3A%2F%2Freact.dev%2Freference%2Freact%2FuseDeferredValue)是一个React Hook，返回一个延后更新的值。

```ini
const deferredValue = useDeferredValue(value);
```

在`useDeferredValue`内部会调用`useState`并触发一次`更新`。

这次`更新`的`优先级`很低，所以当前如果有正在进行中的`更新`，不会受`useDeferredValue`产生的`更新`影响。所以`useDeferredValue`能够返回延迟的值。

Concurrent Mode 还提供了一种优雅降级的机制，用于处理低优先级任务无法立即执行的情况。在任务无法立即执行时，Concurrent Mode 能够自动调整任务的优先级，保证高优先级任务能够得到及时处理，从而避免页面加载和渲染的阻塞，提高用户体验的稳定性和流畅度。

## 结论

Fiber 架构作为 React 的核心架构之一，为 React 应用的性能和用户体验带来了重大改进和优势：

- **增量渲染和时间切片**：Fiber 架构通过增量渲染和时间切片技术，将渲染任务拆分成多个小任务，在浏览器空闲时间执行，提高了页面的响应速度和用户交互的流畅度。
- **优先级调度**：Fiber 架构根据任务的优先级动态调度任务的执行顺序，确保高优先级任务能够优先得到处理，提高了系统的响应速度和稳定性。
- **Concurrent Mode 和 Suspense**：Concurrent Mode 和 Suspense 是 Fiber 架构的重要特性，能够提高页面加载速度和性能表现，优化用户的交互体验。
