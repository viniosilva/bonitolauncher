// IPC Channel Names - Shared between main and renderer
export const IPC_CHANNELS = {
  APPS: {
    GET_ALL: 'apps:get-all',
    GET_ALL_OUTPUT_STREAM: 'apps:get-all-output-stream',
    RUN: 'apps:run',
    RUN_OUTPUT_STREAM: 'apps:run-output-stream'
  }
} as const
