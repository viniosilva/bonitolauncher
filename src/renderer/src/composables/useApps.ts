import { ref, computed, type Ref, type ComputedRef, onMounted, onUnmounted } from 'vue'
import type { GalleryItem } from '../types/GalleryItem'
import { IPC_CHANNELS } from '../../../common/types/IpcChannels'

interface UseAppsReturn {
  // State
  apps: Ref<GalleryItem[]>
  searchTerm: Ref<string>
  loading: Ref<boolean>

  // Computed
  favoriteApps: ComputedRef<GalleryItem[]>
  recentApps: ComputedRef<GalleryItem[]>
  filteredApps: ComputedRef<GalleryItem[]>

  // Methods
  loadApps: () => Promise<void>
  runApp: (appId: string) => Promise<void>
}

export function useApps(): UseAppsReturn {
  const apps = ref<GalleryItem[]>([])
  const searchTerm = ref('')
  const loading = ref(false)

  // Computed properties
  const favoriteApps = computed(() => apps.value.filter((app) => app.isFavorite).slice(300,302))

  const recentApps = computed(() => apps.value.slice(100, 104))

  const filteredApps = computed(() => {
    if (searchTerm.value) {
      const term = searchTerm.value.toLowerCase()

      return apps.value.filter(
        (app) => app.name.toLowerCase().includes(term) || app.category?.toLowerCase().includes(term)
      )
    }

    return apps.value
  })

  const handleAppStream = (_event: any, app: GalleryItem) => {
    apps.value.push(app)
  }

  const setupListener = () => {
    window.electron.ipcRenderer.on(IPC_CHANNELS.APPS.GET_ALL_OUTPUT_STREAM, handleAppStream)
  }

  const cleanupListener = () => {
    window.electron.ipcRenderer.removeAllListeners(IPC_CHANNELS.APPS.GET_ALL_OUTPUT_STREAM)
  }

  // Methods
  const loadApps = async (): Promise<void> => {
    try {
      loading.value = true
      apps.value = [] // Limpa apps anteriores
      await window.electron.ipcRenderer.invoke(IPC_CHANNELS.APPS.GET_ALL)
    } catch (error) {
      console.error('useApps.loadApps:', error)
      apps.value = []
    } finally {
      loading.value = false
    }
  }

  const runApp = async (appId: string): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke(IPC_CHANNELS.APPS.RUN, appId)
    } catch (error) {
      console.error('useApps.runApp:', error)
    }
  }

  // Lifecycle
  onMounted(() => {
    setupListener()
  })

  onUnmounted(() => {
    cleanupListener()
  })

  return {
    // State
    apps,
    searchTerm,
    loading,

    // Computed
    favoriteApps,
    recentApps,
    filteredApps,

    // Methods
    loadApps,
    runApp
  }
}
