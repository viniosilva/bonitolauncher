<template>
  <h2 class="subtitle">
    {{ props.text }}
  </h2>
</template>

<script setup lang="ts">
interface Props {
  text: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped>
.subtitle {
  /* Box model */
  margin: 0;
  padding: 0;

  /* Typography */
  font-weight: bold;
  font-size: var(--font-size-title);
  color: var(--text-color);
  line-height: 1.2;

  /* Transitions */
  transition:
    color var(--transition-fast),
    opacity var(--transition-fast);
}
</style>
