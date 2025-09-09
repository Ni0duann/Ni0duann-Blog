---
updateTime: '2025-09-09 11:40'
tags: 前端八股文
---
在 React 里，`useState`、`useEffect` 这类 React Hook 不能写在逻辑语句（像 `if`、`for`、`while` 循环等）里面，主要是为了保证 Hook 的调用顺序具有一致性。下面为你详细解释：

### 1. React Hook 调用顺序的重要性

React 借助 Hook 的调用顺序来关联状态和对应的 Hook 调用。每次组件渲染时，React 都按相同顺序去调用 Hook。举例说明：

jsx

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  // 第一次调用 useState
  const [count, setCount] = useState(0);
  // 第一次调用 useEffect
  useEffect(() => {
    console.log(`Count is: ${count}`);
  }, [count]);

  // 第二次调用 useState
  const [isLoading, setIsLoading] = useState(false);
  // 第二次调用 useEffect
  useEffect(() => {
    console.log(`Is loading: ${isLoading}`);
  }, [isLoading]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

在这个例子中，每次组件渲染时，React 都会按以下顺序调用 Hook：

1. 第一次调用 `useState`，获取 `count` 状态。
2. 第一次调用 `useEffect`，设定 `count` 改变时的副作用。
3. 第二次调用 `useState`，获取 `isLoading` 状态。
4. 第二次调用 `useEffect`，设定 `isLoading` 改变时的副作用。

### 2. 在逻辑语句里使用 Hook 会打破调用顺序的一致性

要是把 Hook 写在逻辑语句里，那么每次渲染时 Hook 的调用顺序就可能不一样。示例如下：

jsx

```jsx
import React, { useState, useEffect } from 'react';

function BadExample() {
  const [condition, setCondition] = useState(true);

  if (condition) {
    // 只有在 condition 为 true 时才调用 useState
    const [count, setCount] = useState(0);
    useEffect(() => {
      console.log(`Count is: ${count}`);
    }, [count]);
  }

  return (
    <div>
      <button onClick={() => setCondition(!condition)}>Toggle condition</button>
    </div>
  );
}
```

在这个例子中，当 `condition` 改变时，`useState` 和 `useEffect` 可能会被调用，也可能不被调用，这就会打破 Hook 调用顺序的一致性。React 无法正确关联状态和对应的 Hook 调用，从而导致状态混乱或者出现难以调试的错误。

### 3. 规则总结

为保证 Hook 调用顺序的一致性，你需要遵循以下两条规则：

- **只在顶层调用 Hook**：不要在循环、条件判断或者嵌套函数里调用 Hook，要始终在 React 函数的顶层调用 Hook。
- **只在 React 函数里调用 Hook**：不要在普通的 JavaScript 函数里调用 Hook，只能在 React 函数组件或者自定义 Hook 里调用 Hook。
