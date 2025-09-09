---
updateTime: '2025-09-09 11:40'
tags: 百度
---

## 代码风格检查 eslint 安装

```bash
# js
npm install --save-dev eslint @babel/core @babel/eslint-parser
# vue
npm install --save-dev eslint vue-eslint-parser @babel/core @babel/eslint-parser eslint-plugin-vue
# react
npm install --save-dev eslint @babel/core @babel/eslint-parser eslint-plugin-react
# atom
npm install --save-dev eslint @baidu/eslint-plugin-duer @babel/core @babel/eslint-parser
# ts
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
# vue-ts
npm install --save-dev eslint vue-eslint-parser @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue
# react-ts
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react
# flutter
npm install --save-dev eslint vue-eslint-parser @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue @baidu/eslint-plugin-duer
```

## 代码格式化

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

### 配置文件

```js
// .prettier.js  http://gitlab.baidu.com/duerfe/pipeline-procurator/raw/master/.prettierrc.js
module.exports = {
    arrowParens: 'avoid',
    bracketSameLine: false,
    bracketSpacing: false,
    htmlWhitespaceSensitivity: 'strict',
    jsxBracketSameLine: false,
    jsxSingleQuote: false,
    printWidth: 100,
    proseWrap: 'preserve',
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'none',
    useTabs: false
};

// .eslintrc.js eslint-config-prettier8+
{
    extends: [
        ...,
        'plugin:prettier/recommended'
    ],
    rules: [
        'prettier/prettier': 2，
        ...
    ]
}

// .eslintrc.js eslint-config-prettier7-
{
    plugins: [
        ...,
        'prettier'
    ],
    extends: [
        ...,
        'prettier'
    ]，
    rules: [
        'prettier/prettier': 2,
        'arrow-body-style': 0,
        'prefer-arrow-callback': 0
    ]
}
```
