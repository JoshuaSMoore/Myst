<template>
  <div class="mx-2 screenshot">
    <router-link :to="{ name: 'Game', params: { gameId:relatedGame.id }}">
      <img :src="relatedGame.background_image" width="250" class="roundedNew">
      <h5 class="text-shadow mt-2">
        {{ relatedGame.name }}
      </h5>
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
.roundedNew{
  border-radius:15px;
}
.screenshot{
  display:flex;
  align-items:center;
}
.text-shadow{
  color: white;
  text-shadow: 2px 2px 4px #000000;
}
</style>
