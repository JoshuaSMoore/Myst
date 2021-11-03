<template>
  <div class="m-2 bg-dark animate__animated animate__backInDown">
    <div class="card h-100  bg-dark text-light" width="75px">
      <router-link :to="{ name: 'Game', params: { gameId: followedGame.id }}">
        <img :src="followedGame.background_image" class="card-img-top" alt="...">
        <div class="card-body bg-dark text-light">
          <h6 class="card-title">
            {{ followedGame.name }}
          </h6>
        </div>
      </router-link>
      <!-- <i class="mdi mdi-heart f-20 text-danger" type="button" title="favorite game" @click="favoriteGame(followedGame.id, account.id)" v-if="trackedGame">
      </i>
      <i class="mdi mdi-heart f-20 text-light" type="button" title="favorite game" @click="favoriteGame(followedGame.id, account.id)" v-else>
      </i> -->
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { trackedGamesService } from '../services/TrackedGamesService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import 'animate.css'
export default {
  props: {
    followedGame: { type: Object, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      trackedGames: computed(() => AppState.trackedGames),
      followedGames: computed(() => AppState.followedGames),
      async favoriteGame(gameId, userId) {
        try {
          await trackedGamesService.favoriteTrackedGame(gameId, userId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
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
