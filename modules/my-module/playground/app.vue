<template>
  <div>
    Nuxt module playground!
    <h3 class="text-green">{{ myModuleFeature() }}{{ modRef }}</h3>
    <img src="./gif.gif" alt="gif">
    <button @click="modRef ++">test</button>
    <ModuleComp />
  </div>
</template>

<script setup>
import { myModuleFeature } from '#build/my-module-feature.mjs'

const { modRef } = useModuleTest()
</script>
