<template>
  <div>
    <h2>app-2</h2>
    <h3 class="text-green">{{ modRef }}</h3>
    <button @click="modRef ++">test</button>
    <NuxtWelcome />
  </div>
</template>

<script setup>

const { modRef } = useModuleTest()
</script>
