## 利用ESLint

ESLint 是一个插件化的 JavaScript 代码检查工具，它能够帮助我们识别代码中的问题，并提供修复建议。 我们可以配置<font color=red>.eslintrc.json</font>文件，通过添加相应的规则，来软性地禁止console的使用。

```
{
	"rules": {
		"no-console": "warn"
	}
}
```

## 利用git commit

ESLint 的能力有限，无法真正的拦截用户的代码提交。 那么我们就双管齐下，既在代码编写的时候 提醒同事记得删除 console.log ，也在代码提交的时候 不允许 没删干净 console.log 的代码提交。

（文件路径：.git/hooks/pre-commit.sample ）

```
# 检查当前暂存区的文件是否包含console.log
# xargs: 这个命令从 标准输入 （也就是上一个命令的输出）中读取数据，并将其# 作为参数传递给后面的命令。

if git diff --cached --name-only | xargs grep -E 'console\.log'   # grep是用于搜索文本的工具，-E选项启用扩展的正则表达式。
then
	echo "Error: console.log is not allowed in commits."
	exit 1
fi # if 的结束语句
```

**要注意，如果期望pre-commit.sample内部的逻辑能够生效，需要重命名文件，将其改为pre-commit**

## 利用Webpack-plugin
