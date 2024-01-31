export default defineNuxtConfig({
  modules: ['../src/module'],
  myModule: {
    a: 233,
    tailwindcss: {
      theme: {
        extend: {
          colors: {
            space: '#22ee56'
          },
        }
      }
    }
  },
  devtools: { enabled: true },
  devServer: {
    port: 3009
  }
})
