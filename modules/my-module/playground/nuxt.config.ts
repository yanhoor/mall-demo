export default defineNuxtConfig({
  modules: ['../src/module'],
  myModule: {
    a: 233
  },
  devtools: { enabled: true },
  devServer: {
    port: 3009
  }
})
