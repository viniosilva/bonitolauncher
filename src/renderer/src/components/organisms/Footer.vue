<template>
  <footer class="footer">footer</footer>
</template>

<style scoped>
.footer {
  /* Positioning */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;

  /* Box model */
  padding: var(--padding-footer) 0;
  margin: 0 var(--padding-main);

  /* Visual */
  background-color: var(--bg-color);
  border-top: 1px solid var(--text-color);
}
</style>
