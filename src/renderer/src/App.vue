<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useApps } from './composables/useApps'
import { useNavigation } from './composables/useNavigation'
import Header from './components/organisms/Header.vue'
import Footer from './components/organisms/Footer.vue'
import Section from './components/organisms/Section.vue'
import SearchInput from './components/molecules/SearchInput.vue'
import Gallery from './components/organisms/Gallery.vue'
import AppConsole from './components/atoms/AppConsole.vue'


const { loadApps, loading, apps, favoriteApps, recentApps, filteredApps, runApp } = useApps()

const {
  selectGallery,
  selectGalleryItem,
  isSectionSelected,
  isGallerySelected,
  selectedGalleryItem
} = useNavigation()

onMounted(async () => {
  await loadApps()

  document.addEventListener('keydown', handleSectionMainKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleSectionMainKeydown)
})

const handleSearch = (term: string): void => {
  console.log('Searching for:', term)
}

const handleRunApp = async (appId: string): Promise<void> => {
  await runApp(appId)
}

const handleSectionMainKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Tab') return
  if (document.activeElement?.tagName.toLowerCase() !== 'body') return

  event.preventDefault()
  switch (event.key) {
    case 'ArrowUp':
      selectGallery('previous')
      break
    case 'ArrowDown':
      selectGallery('next')
      break
    case 'ArrowLeft':
      selectGalleryItem('previous')
      break
    case 'ArrowRight':
      selectGalleryItem('next')
      break
  }
}

// Array de galerias para facilitar o controle
const mainGalleries = computed(() => [
  { title: 'Favoritos', items: favoriteApps.value },
  { title: 'Recentes', items: recentApps.value },
  { title: 'Todos', items: apps.value.slice(0, 20) }
].filter((gallery) => gallery.items.length))
</script>

<template>
  <main class="main">
    <Header>
      <SearchInput placeholder="Buscar..." :loading="loading" @search="handleSearch" tabindex="1" />
    </Header>

    <Section id="main" :is-selected="isSectionSelected('main')">
      <Gallery v-for="(gallery, index) in mainGalleries" :key="index" :title="gallery.title" :items="gallery.items"
        :is-selected="isGallerySelected(index)" :selected-item-index="selectedGalleryItem"
        @select-gallery="selectGallery" @select-gallery-item="selectGalleryItem" @run-app="handleRunApp" />
    </Section>

    <Section id="search" :is-selected="isSectionSelected('search')">
      <Gallery v-if="filteredApps.length > 0" title="Resultados" :items="filteredApps"
        :is-selected="isGallerySelected(0)" @run-app="handleRunApp" />
    </Section>
    <AppConsole />
    <Footer />
  </main>
</template>

<style scoped>
.main {
  /* Positioning */
  display: flex;
  flex-direction: column;

  /* Box model */
  flex: 1;
  padding: 0 var(--padding-main);
}

.no-results {
  /* Positioning */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Box model */
  padding: var(--margin-space);

  /* Typography */
  text-align: center;
  color: var(--text-color);
  opacity: 0.7;
}
</style>
