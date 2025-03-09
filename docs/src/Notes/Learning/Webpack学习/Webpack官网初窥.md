---
tags: 'Webpack'
---

## 概念

本质上，Webpack是一个用于**现代JavaScript应用程序**的**静态模块打包工具**。当Webpack处理应用程序时，它会在**内部**从**一个或多个入口点**构建**一个依赖图**(dependency graph)，然后将你项目中所需的每一个模块**组合**成一个或多个**bundles**，它们均为**静态资源**，用于展示你的内容。

---

## 入口(entry)

入口起点(entry point)指示Webpack应该**使用哪个模块**，来作为构建其内部依赖图的开始。进入入口起点后，Webpack会找出那些模块和库是入口起点（直接和间接）的依赖的。

默认值是./src/index.js，在Webpack configuration中的entry中指定一个或多个不同的起点入口

```
module.exports = {
	entry: './path/to/my/entry/file.js'
}
```

## 输出(output)

output属性告诉Webpack在**哪里输出**它所构建的**bundle**，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js

```
const path = require('path');

module.exports = {
	entry: './path/to/my/file.js',
	output: {
		path.resolve(_dirname,'dist'),
		filename: 'my-first-webpack.bundle.js',
	},
}
```

## loader

webpack**只能**理解**JavaScript和json**文件，这是Webpack开箱可用的自带能力。loader让Webpack能够去**处理其他类型文件**，并将它们**转换有效模块**，以供应用程序使用，以及被添加到依赖图中。

webpack 的其中一个强大的特性就是能通过 `import` 导入任何类型的模块（例如 `.css` 文件

```
const path = require('path');

module.exports = {
	entry: './path/to/my/file.js',
	output: {
		path.resolve(_dirname,'dist'),
		filename: 'my-first-webpack.bundle.js',
	},
	module: {
		rules: [{test: /\.txt$/,use: 'raw-loader'}]
	},
};
```

## 插件(plugin)

loader用于转换某些类型的模块，而插件则可以用于执行于更广的业务。包括：打包优化，资源管理，注入环境变量。

想要使用一个插件，你只需要 **`require()` 它**，然后把它添加到 **`plugins` 数组**中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而**多次**使用同一个插件，这时需要通过使用 `new` 操作符来**创建一个插件实例**。

```
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const webpack = require('webpack'); //用于访问呢你只插件

module.exports = {
	module: {
		rules: [{test: /\.txt$/, use: 'raw-loader'}],
	},
	plugins: [new HtmlWebpackPlugin({template: './src/index.html'})]
}
```

## 模式(mode)

通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，你可以启用 webpack 内置在**相应环境下的优化**。其默认值为 `production`。

```javascript
module.exports = {
  mode: 'production'
}
```

## 浏览器兼容性(browser compatibility)

Webpack 支持所有符合 [ES5 标准](https://kangax.github.io/compat-table/es5/) 的浏览器（不支持 IE8 及以下版本）。webpack 的 `import()` 和 `require.ensure()` 需要 `Promise`。如果你想要支持旧版本浏览器，在使用这些表达式之前，还需要 [提前加载 polyfill](https://www.webpackjs.com/guides/shimming/)。

## 环境(environment)

Webpack 5 运行于 Node.js v10.13.0+ 的版本。
