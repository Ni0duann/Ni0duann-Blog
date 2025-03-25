1. URL解释
2. DNS查询
3. TCP连接
4. HTTP请求
5. 响应请求
6. 页面渲染

页面渲染过程：

- 解释HTML，构建DOM树
- 解释CSS，生成CSS规则书
- 合并DOM树和CSS规则，生成r**ender树**
- 布局render树（重排）
- 绘制render树（重绘）
- 发送给gpu
