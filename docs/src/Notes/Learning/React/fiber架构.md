> [!IMPORTANT]
>
> 在 React 中，Fiber 是一种用于描述组件树的数据结构，它**代表了一个可中断的、可恢复的渲染任务**。传统的渲染过程是递归式的，一旦开始渲染，就无法中断，直到渲染完成或发生错误。而 Fiber 架构将渲染过程分解成多个小任务，使得在渲染过程中可以中断，并且可以根据需要重新调度任务。Fiber 的引入使得 React 应用能够更好地利用浏览器的空闲时间，提升性能和用户体验。

## Fiber是一种数据结构

```javascript
每个 Fiber 节点包含了与组件相关的信息，如类型、props、state、效果标记（effect tag）等。Fiber 节点还包含了指向其子节点、兄弟节点和父节点的引用，以构建组件树的层级结构。Fiber 节点的数据结构设计使得 React 能够更高效地管理组件树的更新和渲染过程。

{
	stateNOde: new ClickCounter,
	type: clickCounter,
	alernate: null,
	key: null,
	updateQueue:null,
	memoizedstate: {count:0},
	pendingProps: {},
	memoizedProps:{},
	tag: 1,
	effecTage: 0,
	nextEffect: null
}
```

## Fiber树

#### fiber树构建过程

1. **根据 JSX 构建虚拟 DOM 树**：React 会根据 JSX 语法构建虚拟 DOM 树，表示整个组件树的结构。
2. **生成 Fiber 节点**：对于每个虚拟 DOM 节点，React 会生成对应的 Fiber 节点，并建立起 Fiber 树的层级结构。
3. **执行初次渲染**：React 会从根节点开始递归遍历 Fiber 树，执行组件的生命周期方法和渲染函数，将组件树渲染到 DOM 中。

#### 树的更新

更新过程是指在组件状态或属性发生变化时，React 如何更新组件树以反映这些变化。树的协调和更新过程主要包括以下几个步骤：

1. **触发更新**：当组件的状态或属性发生变化时，React 会调用相应的更新函数，标记组件为需要更新状态。
2. **生成新的虚拟 DOM 树**：React 会根据新的状态或属性生成一棵新的虚拟 DOM 树，表示组件树的更新后状态。
3. **协调新旧树**：React 使用协调算法比较新旧两棵虚拟 DOM 树的差异，找出需要更新的部分。
4. **执行更新**：根据协调算法的结果，React 会更新 Fiber 树的相应节点，执行组件的生命周期方法和渲染函数，将更新后的组件树渲染到 DOM 中。



