<template>
  <article class="gallery" :class="{ selected: props.isSelected }">
    <Subtitle :text="props.title" />

    <LineBox align="right">
      <Button type="transparent" :invisible="!props.isSelected" class="arrow previous"
        @click="$emit('selectGallery', 'previous')">
        <Icon name="arrow-up" />
      </Button>
    </LineBox>

    <div class="gallery__content">
      <GalleryItem v-for="(item, index) in props.items" :key="'gallery_item_' + item.id" :item="item"
        :is-selected="isSelected && index === props.selectedItemIndex" @run="handleRunApp" />
    </div>

    <LineBox align="right">
      <Button type="transparent" :invisible="!props.isSelected" class="arrow next"
        @click="$emit('selectGallery', 'next')">
        <Icon name="arrow-down" />
      </Button>
    </LineBox>
  </article>
</template>

<script setup lang="ts">
import Subtitle from '../atoms/Subtitle.vue'
import Icon from '../atoms/Icon.vue'
import Button from '../atoms/Button.vue'
import LineBox from '../molecules/LineBox.vue'
import GalleryItem from '../molecules/GalleryItem.vue'
import type { GalleryItem as GalleryItemType } from '../../types/GalleryItem'

interface Props {
  title: string
  items: GalleryItemType[]
  isSelected: boolean
  selectedItemIndex?: number
}

interface Emits {
  (e: 'selectGallery', direction: 'previous' | 'next'): void
  (e: 'runApp', appId: string): void
}

const props = withDefaults(defineProps<Props>(), {
  selectedItemIndex: -1,
})

const emit = defineEmits<Emits>()

const handleRunApp = (appId: string): void => {
  emit('runApp', appId)
}
</script>

<style scoped>
.gallery {
  /* Positioning */
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;

  /* Box model */
  width: 100%;
  height: auto;
  margin: 0;

  /* Visual */
  opacity: 0;
  transform: translateY(100%);

  /* Transitions */
  transition:
    transform var(--transition-medium),
    opacity var(--transition-medium);

  &.selected {
    /* Positioning */
    pointer-events: auto;
    z-index: var(--z-index-selected);

    /* Box model */
    padding-top: 0;

    /* Visual */
    opacity: 1;
    transform: translateY(0);

    &+article {
      /* Visual */
      opacity: 0.1;
    }
  }
}

.gallery__content {
  /* Positioning */
  display: flex;
  overflow-x: auto;

  /* Box model */
  height: var(--height-gallery);
  gap: var(--gap-small);
  padding-bottom: var(--padding-gallery);
  margin: 0;
}

.gallery__item {
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
  }

  &.selected {
    /* Visual */
    border-color: var(--accent-color);
  }
}
</style>
