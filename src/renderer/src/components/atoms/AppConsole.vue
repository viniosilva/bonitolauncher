<template>
  <div class="app-console">
    <h4>Console Output</h4>
    <p v-for="(line, index) in outputLines" :key="index" class="console-line">
      {{ line }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAppOutput } from '../../composables/useAppOutput'

const { outputLines } = useAppOutput()
</script>

<style scoped>
.app-console {
  background: var(--bg-color-strong);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  margin: 1rem 0;
  overflow: hidden;
}

.console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
}

.console-header h4 {
  margin: 0;
  color: var(--text-color);
}

.clear-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.clear-btn:hover {
  background: var(--accent-color-hover);
}

.console-output {
  max-height: 200px;
  overflow-y: auto;
  padding: 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  line-height: 1.4;
}

.console-line {
  color: var(--text-color);
  margin: 0;
  padding: 0.125rem 0;
  word-wrap: break-word;
}
</style>