<template>
  <div class="gallery-item" :class="{ selected: props.isSelected }" :data-bg="props.item.backgroundSrc"
    :data-music="props.item.musicSrc" @click="handleClick">
    <img :src="props.item.imageSrc" :alt="props.item.name" />
  </div>
</template>

<script setup lang="ts">
import type { GalleryItem } from '../../types/GalleryItem'

interface Props {
  item: GalleryItem
  isSelected: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'run', appId: string): void }>()

const handleClick = () => {
  emit('run', props.item.id)
}
</script>

<style scoped>
.gallery-item {
  /* Box model */
  min-width: var(--item-min-width);
  width: var(--item-size);
  aspect-ratio: 1;
  flex-shrink: 0;
  border: var(--border-width) solid var(--bg-color);
  border-radius: var(--border-radius);
  padding: 0;
  margin: 0;
  cursor: pointer;

  /* Visual */
  background-color: var(--bg-color-strong);

  /* Transitions */
  transition: border-color var(--transition-fast);

  &>img {
    /* Box model */
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--border-radius);
  }

  &.selected {
    /* Visual */
    border-color: var(--accent-color);
  }
}
</style>
