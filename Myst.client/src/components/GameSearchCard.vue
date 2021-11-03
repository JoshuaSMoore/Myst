<template>
  <div class="card bg-dark m-2 w-25" v-if="game">
    <router-link :to="{ name: 'Game', params: { gameId: game.id }}">
      <img :src="game.backgroundImage" class="rounded w-100" alt="...">
      <div class="card-body">
        <h5 class="card-title">
          <!-- NOTE game.released isn't showing up on screen -->
          {{ game.name }}, {{ game.released }}
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
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.548);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.829);
}
</style>
