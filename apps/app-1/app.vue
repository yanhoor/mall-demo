<template>
  <div>
    <h2>app-1{{ myModuleFeature() }}</h2>
    <ModuleComp />
    <img :src="gif" alt="gif">
    <NuxtWelcome />
  </div>
</template>

<script setup>
import { myModuleFeature } from '#build/my-module-feature.mjs'
import gif from '#my-module/assets/image/gif.gif'
// const {execute} = await useFetch('/1111', {
//   onRequest({ request, options }) {
//     // Set the request headers
//     options.headers = options.headers || {}
//     options.headers.version = '3.0.0'
//   },
//   method: 'post',
//   body: {"id":819,"curNum":2,"offset":"10","storeId":"-2000001394","shopId":"2000001394"},
//   lazy: true,
//   server: false
// })

onMounted(() => {
  // execute()
})
</script>
