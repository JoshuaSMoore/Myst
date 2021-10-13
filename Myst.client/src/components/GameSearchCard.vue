<template>
  <div class="card p-0" style="width: 25rem;" v-if="game">
    <router-link :to="{ name: 'Game', params: { gameId: game.id }}">
      <img :src="game.backgroundImage" class="card-img-top rounded" alt="...">
      <div class="card-body">
        <h5 class="card-title">
          {{ game.name }} ({{ game.released }})
        </h5>
        <p class="card-text">
          {{ game.esrb_rating.name }}
        </p>
      </div>
    </router-link>
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
