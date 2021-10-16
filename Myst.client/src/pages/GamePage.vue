<template>
  <div class="container-fluid pt-5 text-center">
    <div class="row">
      <div class="col-12 d-flex justify-content-around my-4">
        <h1 class="">
          <b>
            {{ game.name }}
          </b>
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-lg-4 me-2 card bg-dark rounded-5 shadow-lg">
        <img :src="game.background_image" alt="" class="img-fluid rounded my-2">
        <div class="">
          <div v-if="gameFollowCheck">
            <button @click="deleteTrackedGame(game.id)" class="btn btn-warning">
              Unfollow game
            </button>
          </div>
          <div v-else>
            <button @click="createTrackedGame(game.id)" class="btn btn-info">
              Follow game
            </button>
          </div>
          <div class=" card follower-card bg-dark text-light border-light my-2">
            <div class="d-flex">
              <GameFollower v-for="t in gameFollowers" :key="t.id" :tracker="t" class="m-2" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 ms-2 card bg-dark shadow-lg text-light description-card scrollable-y">
        <div class="d-flex justify-content-around">
          <h4>
            Score: {{ game.rating }}
          </h4>
          <h4 v-if="game.esrb_rating">
            Rating:
            {{ game.esrb_rating.name }}
          </h4>
          <h4>
            Released: {{ game.released }}
          </h4>
        </div>
        <div class="text-start">
          <p>
            <b> game description: </b>
            {{ game.description_raw }}
          </p>
          <a :href="game.website">
            Game Site
          </a>
        </div>
        <div class="d-flex justify-content-around">
          <div>
            <GamePlatforms v-for="p in game.platforms" :key="p.id" :platform="p" />
          </div>
          <div>
            <GameGenres v-for="g in game.genres" :key="g.id" :genre="g" />
          </div>
        </div>
      </div>
    </div>
    <div class="row pt-4">
      <div class="col-1"></div>
      <div class="col-5 me-2 p-3 card bg-dark text-light mb-3">
        <h3 class="mb-5">
          Related Games
        </h3>
        <div class="d-flex related-game-card">
          <RelatedGame v-for="g in relatedGames" :key="g.id" :related-game="g" class="mx-2" />
        </div>
      </div>
      <div class="col-5 ms-2 p-5 card bg-dark text-light mb-3">
        <h3 class="mb-5">
          Game Screenshots
        </h3>
        <div class="d-flex screenshot-card">
          <GameScreenshots v-for="g in gameScreenShots" :key="g.id" :screen-shot="g" class="mx-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop.js'
import { gamesSearchService } from '../services/GamesSearchService.js'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { trackedGamesService } from '../services/TrackedGamesService.js'

export default {
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      if (route.params.gameId) {
        await gamesSearchService.getGameById(route.params.gameId)
      }
    })
    onMounted(async() => {
      try {
        await trackedGamesService.getTrackedGamesByGameId(route.params.gameId)
        await trackedGamesService.checkTracked()
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      game: computed(() => AppState.game),
      relatedGames: computed(() => AppState.relatedGames),
      gameScreenShots: computed(() => AppState.gameScreenShots),
      gameFollowers: computed(() => AppState.gameFollowers),
      gameFollowCheck: computed(() => AppState.gameFollowCheck),

      async createTrackedGame(gameId) {
        try {
          await trackedGamesService.createTrackedGame(gameId)
          await trackedGamesService.checkTracked()
          Pop.toast("you've followed this game!", 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async deleteTrackedGame(gameId) {
        try {
          await trackedGamesService.deleteTrackedGame(gameId)
          await trackedGamesService.checkTracked()
          Pop.toast("you've unfollowed this game", 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.description-card{
  height: 25rem;
}
.related-game-card{
  height: 15rem;
  overflow-x: scroll;
  overflow-y: hidden;
}
.screenshot-card{
  height: 15rem;
  overflow-x: scroll;
  overflow-y: hidden;
}
.follower-card{
  overflow-x: scroll;
  overflow-y: hidden;
}
.follower-card ::-webkit-scrollbar {
  display: none;
}

</style>
