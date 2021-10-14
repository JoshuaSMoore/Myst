<template>
  <div>
    <h5 class="text-light">
      {{ relatedGame.name }}
    </h5>
    <img :src="relatedGame.background_image" width="200" alt="">
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
