<template>
  <section :data-id="props.id" :class="['section', { selected: props.isSelected }]">
    <slot />
  </section>
</template>

<script setup lang="ts">
interface Props {
  id: string
  isSelected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: false
})
</script>

<style scoped>
.section {
  /* Positioning */
  position: absolute;
  top: 100%;
  z-index: -1;

  /* Visual */
  opacity: 0;
  pointer-events: none;
  overflow: hidden;

  /* Box model */
  flex: 0;

  /* Transitions */
  transition:
    opacity var(--transition-medium),
    top var(--transition-medium);

  &.selected {
    top: 0;
    position: relative;

    /* Box model */
    flex: 1;

    /* Visual */
    opacity: 1;
    z-index: 0;
    pointer-events: auto;
  }
}
</style>
