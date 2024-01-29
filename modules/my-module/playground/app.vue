<template>
  <div>
    Nuxt module playground!
    <h3 class="text-green">{{ myModuleFeature() }}{{ modRef }}</h3>
    <img :src="gif" alt="gif">
    <button @click="modRef ++">test</button>
    <ModuleComp />
  </div>
</template>

<script setup>
import { myModuleFeature } from '#build/my-module-feature.mjs'
import gif from '#my-module/assets/image/gif.gif'

const { modRef } = useModuleTest()
</script>
