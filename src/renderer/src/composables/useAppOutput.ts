import { ref, onMounted, onUnmounted } from 'vue'
import { IPC_CHANNELS } from '../../../common/types/IpcChannels'

export function useAppOutput() {
  const outputLines = ref<string[]>([])
  const isListening = ref(false)

  const startListening = () => {
    if (isListening.value) return
    
    isListening.value = true
    outputLines.value = [] // Limpa output anterior
    
    window.electron.ipcRenderer.on(IPC_CHANNELS.APPS.RUN_OUTPUT_STREAM, (_e, data: string) => {
      outputLines.value.push(data)
      console.log('App Output:', data)
    })
  }

  const stopListening = () => {
    isListening.value = false
    window.electron.ipcRenderer.removeAllListeners(IPC_CHANNELS.APPS.RUN_OUTPUT_STREAM)
  }

  const clearOutput = () => {
    outputLines.value = []
  }

  onMounted(() => {
    startListening()
  })

  onUnmounted(() => {
    stopListening()
  })

  return {
    outputLines,
    isListening,
    startListening,
    stopListening,
    clearOutput
  }
} 