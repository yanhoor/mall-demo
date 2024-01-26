<template>
  <div>
    Nuxt module playground!
    <h3>{{ modRef }}</h3>
    <button @click="modRef ++">test</button>
    <ModuleComp />
  </div>
</template>

<script setup>

const { modRef } = useModuleTest()
</script>
