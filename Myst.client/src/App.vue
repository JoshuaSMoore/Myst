<template>
  <header>
    <NavbarTest />
  </header>
  <main class="bg-bg-grad">
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.bg-bg-grad {
  background: linear-gradient(41deg, #cc49d2 0%, #00d4ff 35%, #000000 100%);}
</style>
