<template>
  <div class="home">
    <example-vue />
  </div>
</template>

<script>
import Example from './Example.vue'

export default {
  name: 'Home',
  components: { 'example-vue': Example }
}
</script>
