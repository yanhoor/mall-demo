import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module', // 通常是 npm 下载的包名，如 @nuxtjs/ccc
    configKey: 'myModule', // 引用本 module 后，在 nuxt.config 配置本 module 的 key
    // 兼容性限制
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  // 本 module 的默认配置，也可以是返回配置对象的函数
  defaults: {},
  // 注册 hooks 的语法糖
  hooks: {},
  // 设置本 module 的逻辑，可以异步
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // 应用运行时并不包含 module，如果想要应用包含本 module 提供的运行时代码，可以在 runtime 目录编写。
    addPlugin(resolver.resolve('./runtime/plugin'))
  }
})
