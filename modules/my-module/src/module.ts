import { defineNuxtModule, addPlugin, addComponentsDir, createResolver } from '@nuxt/kit'

/**
 * @description 本 module 入口，当 Nuxt 应用的 nuxt.config 引用本 module 时，就会加载本文件
 */
// nuxt.config 配置本 module 时选项的类型
export interface ModuleOptions {
  a: number
}

/**
 * @description 最后返回一个函数：function (inlineOptions, nuxt)
 *
 */
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module', // 通常是 npm 下载的包名，如 @nuxtjs/ccc
    configKey: 'myModule', // 引用本 module 后，在 nuxt.config 配置本 module 的参数选项 key
    // 兼容性限制
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  // 本 module 的默认配置，也可以是返回配置对象的函数
  defaults: {
    a: 0
  },
  // 注册 hooks 的语法糖
  hooks: {},
  /**
   * @description 设置本 module 的逻辑，可以异步
   * @param options 使用本 module 时，在 nuxt.config 的 myModule 传入的参数选项
   * @param nuxt
   */
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    console.log('========setup options========', options)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // 应用运行时并不包含 module，如果想要应用包含本 module 提供的运行时代码，可以在 runtime 目录编写。
    addPlugin(resolver.resolve('./runtime/plugin'))
    addPlugin(resolver.resolve('./plugins/test'))
    addComponentsDir({
      path: resolver.resolve('./components')
    })
  }
})
