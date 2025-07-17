<template>
  <header class="header">
    <slot />
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.header {
  /* Box model */
  padding: var(--padding-header) 0;
}
</style>
