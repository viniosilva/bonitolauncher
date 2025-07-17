import { Ref, ref } from 'vue'

export type AppSection = 'main' | 'search'
export type Direction = 'previous' | 'next'

interface UseNavigationReturn {
  selectedSection: Ref<AppSection>
  selectedGallery: Ref<number>
  selectedGalleryItem: Ref<number>
  isSectionSelected: (id: AppSection) => boolean
  isGallerySelected: (index: number) => boolean
  isGalleryItemSelected: (index: number) => boolean
  selectSection: () => void
  selectGallery: (direction: Direction) => void
  selectGalleryItem: (direction: Direction) => void
}

export function useNavigation(): UseNavigationReturn {
  const selectedSection = ref<AppSection>('main')
  const selectedGallery = ref(0)
  const selectedGalleryItem = ref(0)

  const isSectionSelected = (id: AppSection): boolean => selectedSection.value === id

  const selectSection = (): void => {
    switch (selectedSection.value) {
      case 'search':
        selectedSection.value = 'main'
        break
      default:
        selectedSection.value = 'search'
        break
    }
  }

  const isGallerySelected = (index: number): boolean => selectedGallery.value === index

  const selectGallery = (direction: Direction): void => {
    const galeries = document.querySelectorAll('section[data-id="main"] .gallery')
    const lastGalleryIndex = galeries.length - 1

    // Reset scroll position of the previous selected gallery
    const previousSelectedGallery = galeries[selectedGallery.value]
    setTimeout(() => {
      previousSelectedGallery.querySelector('.gallery__content')?.scrollTo({ left: 0, behavior: 'smooth' })
    }, 250)

    if (direction === 'previous') {
      if (isGallerySelected(0)) {
        selectedGallery.value = lastGalleryIndex
      } else {
        selectedGallery.value -= 1
      }
    } else {
      if (isGallerySelected(lastGalleryIndex)) {
        selectedGallery.value = 0
      } else {
        selectedGallery.value += 1
      }
    }

    // Reset selected gallery item
    selectedGalleryItem.value = 0
  }

  const selectGalleryItem = (direction: Direction): void => {
    const galleryItems = document.querySelectorAll('section[data-id="main"] .gallery.selected .gallery-item')
    const lastGalleryItemIndex = galleryItems.length - 1

    if (direction === 'previous') {
      if (isGalleryItemSelected(0)) {
        selectedGalleryItem.value = lastGalleryItemIndex
      } else {
        selectedGalleryItem.value -= 1
      }
    } else {
      if (isGalleryItemSelected(lastGalleryItemIndex)) {
        selectedGalleryItem.value = 0
      } else {
        selectedGalleryItem.value += 1
      }
    }

    const galleryItem = galleryItems[selectedGalleryItem.value]
    galleryItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })

    // const mainEl = document.querySelector('main') as HTMLElement | null
    // const bg = (galleryItem instanceof HTMLElement) ? galleryItem.dataset.bg : undefined
    // if (mainEl && bg) {
    //   mainEl.style.backgroundImage = `url(${bg})`
    // }
  }

  const isGalleryItemSelected = (index: number): boolean => {
    return selectedGalleryItem.value === index
  }

  return {
    selectedSection,
    selectedGallery,
    selectedGalleryItem,
    isSectionSelected,
    isGallerySelected,
    isGalleryItemSelected,
    selectSection,
    selectGallery,
    selectGalleryItem
  }
}
