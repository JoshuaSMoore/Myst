<template>
  <div>
    <router-link :to="{ name: 'Game', params: { gameId:relatedGame.id }}">
      <h5 class="text-light">
        {{ relatedGame.name }}
      </h5>
      <img :src="relatedGame.background_image" width="300" alt="">
    </router-link>
  </div>
</template>

<script>
import { Game } from '../models/Games'
export default {
  props: {
    relatedGame: { type: Game, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
