# 说明

[参考](https://nuxt.com/docs/guide/going-further/modules#best-practices)，新建项目

- 应用运行时并不包含 `module`，如果想要应用包含本 `module` 提供的运行时代码，可以在 `src/runtime` 目录编写。

## 问题

### 打包报错 `@nuxt/kit`、`my-module` 找不到

先试试执行 `dev:prepare` 生成 `.nuxt` 目录
