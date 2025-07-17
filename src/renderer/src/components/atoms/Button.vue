<template>
  <button
    :class="['button', `button--${props.type}`, { 'button--invisible': props.invisible }]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'default' | 'transparent' | 'primary' | 'secondary'
  invisible?: boolean
}

interface Emits {
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  invisible: false
})

defineEmits<Emits>()
</script>

<style scoped>
.button {
  /* Positioning */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Box model */
  border: none;
  cursor: pointer;

  /* Typography */
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;

  /* Visual */
  transition: all var(--transition-fast);

  /* Types */
  &.button--default {
    background-color: var(--bg-color-strong);
    color: var(--text-color);
    border: 1px solid var(--border-color);

    &:hover:not(:disabled) {
      background-color: var(--bg-color);
    }
  }

  &.button--transparent {
    background-color: transparent;
    color: var(--text-color);
    border: none;
    padding: 0;
  }

  &.button--primary {
    background-color: var(--accent-color);
    color: white;
    border: 1px solid var(--accent-color);

    &:hover:not(:disabled) {
      background-color: var(--accent-color-hover);
    }
  }

  &.button--secondary {
    background-color: transparent;
    color: var(--accent-color);
    border: 1px solid var(--accent-color);

    &:hover:not(:disabled) {
      background-color: var(--accent-color);
      color: white;
    }
  }

  /* States */
  &.button--invisible {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
