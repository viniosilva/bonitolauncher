<template>
  <div class="search-input">
    <Input v-model="searchTerm" :placeholder="props.placeholder" @search="handleSearch" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Input from '../atoms/Input.vue'

interface Props {
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Buscar...'
})

const searchTerm = ref('')

const handleSearch = (value: string): void => {
  console.log('Searching for:', value)
  // Add logic to search for apps
  // Emit events to the organism parent
}
</script>

<style scoped>
.search-input {
  /* Positioning */
  position: relative;
  display: flex;
  flex-direction: column;

  /* Box model */
  width: 100%;
}
</style>
