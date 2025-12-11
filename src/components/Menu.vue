<template>
  <!-- Header nav removed per request; logo moved to Searchbox row -->
  <header class="menu-header"></header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Empty script retained for consistency
const mobileMenuOpen = ref(false)
</script>

<style scoped>
.menu-header {
  background: transparent;
  border: none;
  width: 100%;
  height: 0;
}
/* All previous nav styles removed */
</style>
