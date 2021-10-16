<template>
  <div class="">
    <div class="card h-100  bg-dark text-light" width="50px">
      <router-link :to="{ name: 'Game', params: { gameId: followedGame.id }}">
        <img :src="followedGame.background_image" class="card-img-top" alt="...">
        <div class="card-body bg-dark text-light">
          <h5 class="card-title">
            {{ followedGame.name }}
          </h5>
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

</style>
