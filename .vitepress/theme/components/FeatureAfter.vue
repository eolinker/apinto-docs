<script lang='ts' setup>
import Diff from './Diff.vue'
import Blog from './Blog.vue'
</script>

<template>
  <div class="content mt-30">
    <div class="content-container container ma space-y-20">
      <Diff />
      <Blog />
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto !important;
  max-width: 1152px !important;
}
</style>
