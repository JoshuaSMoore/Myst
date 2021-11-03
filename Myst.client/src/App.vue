<template>
  <header>
    <Navbar />
  </header>
  <main class="bg-bg-grad mt-5">
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
      appState: computed(() => AppState),
      followedGames: computed(() => AppState.followedGames)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
// .bg-bg-grad {
//   background: linear-gradient(41deg, #cc49d2 0%, #00d4ff 35%, #000000 100%);}

  .bg-bg-grad{
  justify-content: center;
  background: linear-gradient(-60deg, #00d4ff, #000000, #000000, #cc49d2);
  background-size: 600% 600%;
animation: gradient 15s ease infinite;
}
@keyframes gradient {
0% {
background-position: 0% 50%;
}
50% {
background-position: 100% 50%;
}
100% {
background-position: 0% 50%;
}
}
</style>
