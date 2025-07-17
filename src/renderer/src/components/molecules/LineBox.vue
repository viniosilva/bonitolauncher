<template>
  <div class="line-box" :class="`align-${props.align}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  align?: 'left' | 'center' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  align: 'left'
})
</script>

<style scoped>
.line-box {
  padding-top: var(--padding-gallery);

  &.align-center {
    display: flex;
    justify-content: center;
  }

  &.align-right {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
