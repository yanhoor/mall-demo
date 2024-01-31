import { defineNuxtModule, addTemplate, addPlugin, addComponentsDir, addImportsDir, createResolver, installModule } from '@nuxt/kit'
import  type { ModuleOptions as tw } from '@nuxtjs/tailwindcss'
/**
 * @description 本 module 入口，当 Nuxt 应用的 nuxt.config 引用本 module 时，就会加载本文件
 */
// nuxt.config 配置本 module 时选项的类型
export interface ModuleOptions {
  a: number
  prefix?: string
  tailwindcss?: tw['config']
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
    a: 0,
    tailwindcss: {
    },
    prefix: 'my' // 组件的前缀，使用本 module 的组件时都是 <my-xxxxx />
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
   * @param nuxt 使用本 module 的 app 实例，所以下面的 nuxt.options 都是修改 app 的 nuxt.config
   */
  async setup (options, nuxt) {
    const {resolve} = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')

    // 暴露 runtime 目录给应用导入，如 import { useModuleTest } from '#my-module/composables/useModuleTest'
    nuxt.options.alias['#my-module'] = runtimeDir

    // console.log('========setup options========', options, nuxt.options)

    // 读取 app 的 tailwind.config 文件，合并前
    nuxt.hook('tailwindcss:loadConfig', function (p) {
      console.log('========tailwindcss:loadConfig========', p)
    })

    // 最终的配置
    nuxt.hook('tailwindcss:resolvedConfig', function (p) {
      console.log('========tailwindcss:resolvedConfig========')
    })

    // 读取 app 的 tailwind.config 文件，合并后
    // 因为这里比 installModule 晚执行，所以这里的配置会覆盖 installModule 传的同名配置
    nuxt.hook('tailwindcss:config', function (tailwindConfig) {
      console.log('========tailwindcss:config========', tailwindConfig)
      // tailwindConfig.theme = tailwindConfig.theme || {}
      // tailwindConfig.theme.extend = tailwindConfig.theme.extend || {}
      // tailwindConfig.theme.extend.colors = tailwindConfig.theme.extend.colors || {}
      // options.tailwindcss = defu(options.tailwindcss || {}, tailwindConfig)
    })
    console.log('========setup options.tailwindcss========', options.tailwindcss)

    // 使用 installModule 安装的模块都会暴露给 app 使用，需要本 module 先安装
    await installModule('@nuxtjs/tailwindcss', {
      // 暴露 tw 的配置值给 app 使用，但是即使是 false 也可以在 app 的 style 使用 theme() 函数
      exposeConfig: {
        level: 4, // 暴露的深度，如 theme.colors.red.500 4级
        alias: '#twcss' // 别名，如 import { theme } from '#twcss'
      },
      config: options.tailwindcss
    })

    // 应用运行时并不包含 module，如果想要应用包含本 module 提供的运行时代码，可以在 runtime 目录编写。

    // Plugin，不要加 .ts 后缀，因为打包后会被转化成 .mjs
    addPlugin(resolve('./runtime/plugins/plugin'))
    addPlugin(resolve('./runtime/plugins/test'))

    // component
    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: options.prefix
    })

    // composables
    addImportsDir(resolve('./runtime/composables'))

    nuxt.options.css.push(resolve('./runtime/assets/style/common.css'))

    // todo: 可以通过 import gif from '#my-module/assets/image/gif.gif' 引用，实际也会打包在 app 的 public 下
    nuxt.hook('nitro:config', async (nitroConfig) => {
      nitroConfig.publicAssets ||= []
      nitroConfig.publicAssets.push({
        dir: resolve('./runtime/assets/image'),
        maxAge: 60 * 60 * 24 * 365 // 缓存
      })
    })

    // addTemplate 添加可以在 Nuxt 应用被 import 的虚拟文件
    // 这个文件会被添加到 Nuxt 的虚拟文件系统并且可以被导入
    // 可以使用 import { myModuleFeature } from '#build/my-module-feature.mjs'
    addTemplate({
      filename: 'my-module-feature.mjs',
      getContents: () => 'export const myModuleFeature = () => "string from my-module my-module-feature template file"'
    })

    // 本 module 的清理工作，比如本 module 开启了一个 watcher，应该在 Nuxt 应用生命周期结束时关闭
    nuxt.hook('close', async nuxt => {
      console.log('=========my-module close==========')
      // Your custom code here
    })
  }
})
