---
updateTime: '2025-07-22 17:08'
tags: 百度
---
> [!NOTE]
>
> 问题：目前 rem 方案 html font-size 是固定 100px，没有根据屏幕宽度进行换算，导致很多手机上视觉不符合预期
>
> 目标：根据屏幕宽度动态计算 font-size，做好宽屏和窄屏处理

## 原理

在使用单位控制页面元素大小时，可以使用固定单位px，也可以使用相对单位rem。2rem 等于html标签font-size的2倍。基于这个原理，对于需要适配屏幕等比缩放的元素可以选用rem作为单位，对于不需要等比缩放的元素依旧使用px作为单位。只要调整html标签的font-size，就能让所有使用rem单位的元素跟随着发生变化，而使用px单位的元素不受影响。问题的关键在于如何根据屏幕尺寸跳转html标签的font-size。


## 方案
```javascript
// 封装rem适配H5项目
const setRootFontSize = () => {
    const docEl = document.documentElement;
    const width = docEl.clientWidth || window.innerWidth;

    // 边界值控制 (375px-750px)
    const minWidth = 375;
    const maxWidth = 750;
    const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, width));

    // 基准计算 (设计稿375px → 1rem=100px)
    docEl.style.fontSize = `${constrainedWidth / 3.75}px`;
};

// 初始化
setRootFontSize();
// 窗口变化时重置
window.addEventListener('resize', setRootFontSize);
// 页面加载时重置
window.addEventListener('pageshow', e => {
    // 处理页面缓存时的font-size大小重置
    if (e.persisted) {
        setRootFontSize();
    }
});

```
