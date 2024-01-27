import { defineNuxtModule, addTemplate, addPlugin, addComponentsDir, addImportsDir, createResolver } from '@nuxt/kit'

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
  // hooks: {
  //   'app:error': (err: any) => {
  //     console.error('=========app:error from my-module=========', err);
  //   }
  // },
  /**
   * @description 设置本 module 的逻辑，可以异步
   * @param options 使用本 module 时，在 nuxt.config 的 myModule 传入的参数选项
   * @param nuxt
   */
  setup (options, nuxt) {
    const {resolve} = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')
    nuxt.options.alias['#my-module'] = runtimeDir

    console.log('========setup options========', options)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // 应用运行时并不包含 module，如果想要应用包含本 module 提供的运行时代码，可以在 runtime 目录编写。

    // Plugin
    addPlugin(resolve('./runtime/plugins/plugin'))
    addPlugin(resolve('./runtime/plugins/test'))

    // component
    addComponentsDir({
      path: resolve('./runtime/components')
    })

    // composables
    addImportsDir(resolve('./runtime/composables'))

    nuxt.options.css.push(resolve('./runtime/assets/style/common.css'))

    // todo: 无效
    nuxt.hook('nitro:config', async (nitroConfig) => {
      nitroConfig.publicAssets ||= []
      nitroConfig.publicAssets.push({
        dir: resolve('./runtime/assets/image'),
        maxAge: 60 * 60 * 24 * 365 // 1 year
      })
    })

    // addTemplate 添加可以在 Nuxt 应用被 import 的虚拟文件
    // 这个文件会被添加到 Nuxt 的虚拟文件系统并且可以被导入
    // 可以使用 import { myModuleFeature } from '#build/my-module-feature.mjs'
    addTemplate({
      filename: 'my-module-feature.mjs',
      getContents: () => 'export const myModuleFeature = () => "hello world !"'
    })

    // 本 module 的清理工作，比如本 module 开启了一个 watcher，应该在 Nuxt 应用生命周期结束时关闭
    nuxt.hook('close', async nuxt => {
      console.log('=========my-module close==========')
      // Your custom code here
    })
  }
})
