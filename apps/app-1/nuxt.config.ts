// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // nitro: {
  //   //     请求配置
  //   devProxy: {
  //     '/api': {
  //       target: 'https://35465677', // 这里是正式接口地址
  //       // target: 'https://dstand.smallrig.net/dev/api/', // 这里是开发环境接口地址
  //       changeOrigin: true,
  //       prependPath: true,
  //     },
  //   },
  // },

  // vite: {
  //   server: {
  //     proxy: {
  //       '/api': {
  //         target: 'https://758678',
  //         changeOrigin: true,
  //         rewrite: (path) => path.replace(/^\/api/, ''),
  //       }
  //     }
  //   }
  // },
  modules: ["my-module"]
})
