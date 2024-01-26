<template>
  <div>
    <h2>app-1</h2>
    <NuxtWelcome />
    <ModuleComp />
  </div>
</template>

<script setup>
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
