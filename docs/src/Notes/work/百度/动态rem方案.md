---
updateTime: '2025-07-21 20:39'
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
(function rem() { 
  let dw = 750  // 设计图宽度
  let sw = window.screen.width  // 屏幕宽度
  let fontSize = (sw / dw * 100)        // 方案1
  // let fontSize = (sw / dw)            // 方案2
  let oHtml = document.getElementsByTagName('html')[0]
  oHtml.style.fontSize = fontSize + 'px'

  // 设置边界
  const boundary = ()=>{
    if(sw>580){
      oHtml.style.fontSize = 64 + 'px'
    }
    if(sw<300){
      oHtml.style.fontSize = 40 + 'px'
    }
  }
  boundary()
  
  window.onresize = function (event) {
    rem();
    boundary();
  }
})();

```
