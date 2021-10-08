<template>
  <div class="card p-0" style="width: 18rem;" v-if="game">
    <img :src="game.backgroundImage" class="card-img-top rounded" alt="...">
    <div class="card-body">
      <h5 class="card-title">
        {{ game.name }}
      </h5>
      <p class="card-text">
        {{ game.esrb_rating.name }}
      </p>
    </div>
  </div>
</template>

<script>
import { Game } from '../models/Games'
export default {
  props: {
    game: {
      type: Game,
      required: true
    }
  },
  setup(props) {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
