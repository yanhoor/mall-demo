<template>
  <div>
    Nuxt module playground!
    <h3 class="text-space font-bold">{{ myModuleFeature() }}{{ modRef }}</h3>
    <img :src="gif" alt="gif">
    <button class="btn text-primary" @click="modRef ++">test</button>
    <MyModuleComp />
  </div>
</template>

<script setup>
import { myModuleFeature } from '#build/my-module-feature.mjs'
import gif from '#my-module/assets/image/gif.gif'

const { modRef } = useModuleTest()
</script>
