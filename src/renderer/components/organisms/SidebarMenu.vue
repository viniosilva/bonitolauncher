<template>
  <nav class="sidebar-menu"></nav>
</template>

<script setup lang="ts"></script>

<style scoped>
.sidebar-menu {
  /* Positioning */
  position: relative;

  /* Box model */
  width: var(--nav-width);
  flex-shrink: 0;

  /* Visual */
  background-color: var(--bg-color-strong);
}
</style>
