# 说明

[参考](https://nuxt.com/docs/guide/going-further/modules#best-practices)，新建项目

- 应用运行时并不包含 `module`，如果想要应用包含本 `module` 提供的运行时代码，可以在 `src/runtime` 目录编写。

## 最佳实践

### 异步

`Nuxt module` 是可以异步的，比如需要网络请求或者调用 `async` 函数等。这时应该注意 `Nuxt` 会在进入下一个 `module` 之前、启动 `devServer` 、构建等之前，会等待你的 `module` 完成安装。

### 在暴露的接口使用前缀

对于暴露的配置项、`plugin`、`api`、`composable`、`component` 等必须使用明确的前缀来命名，避免与应用内或其他 `module` 命名冲突。最好是使用 `module` 的名字来使用前缀，如 `module` 名为 `nuxt-foo`，则可以使用 `<FooButton>`、`useFooBar()` 等。

## 问题

### 打包报错 `@nuxt/kit`、`my-module` 找不到

先试试执行 `dev:prepare` 生成 `.nuxt` 目录
