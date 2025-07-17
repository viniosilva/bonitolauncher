<template>
  <svg
    :class="['icon', `icon--${props.name}`]"
    :style="{ width: props.size, height: props.size }"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      v-if="props.name === 'search'"
      d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      v-if="props.name === 'arrow-up'"
      d="M6 15L12 9L18 15"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      v-if="props.name === 'arrow-down'"
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  name: 'search' | 'arrow-up' | 'arrow-down'
  size?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '1.2rem'
})
</script>

<style scoped>
.icon {
  /* Visual */
  color: var(--text-color);
}
</style>
