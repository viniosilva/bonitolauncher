<template>
  <div class="search-input-container">
    <Icon name="search" size="1.2rem" />
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      class="search-input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @keyup.enter="$emit('search', modelValue)"
    />
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'

interface Props {
  modelValue: string
  placeholder?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.search-input-container {
  /* Positioning */
  display: flex;
  align-items: center;

  /* Box model */
  width: 100%;
  max-width: 30rem;
  height: 3rem;
  padding: 0 1rem;
  border-radius: 1.5rem;

  /* Visual */
  background-color: var(--bg-color-strong);
  border: 2px solid transparent;
  transition: border-color var(--transition-fast);

  &:focus-within {
    /* Visual */
    border-color: var(--accent-color);
  }
}

.search-input {
  /* Positioning */
  flex: 1;

  /* Box model */
  width: 100%;
  height: 100%;
  padding: 0;
  margin-left: 0.75rem;
  border: none;
  outline: none;

  /* Typography */
  font-size: 1rem;
  color: var(--text-color);

  /* Visual */
  background: transparent;

  &::placeholder {
    /* Typography */
    color: var(--text-color);

    /* Visual */
    opacity: 0.5;
  }
}
</style>
