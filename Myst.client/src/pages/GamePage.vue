<template>
  <div class="container-fluid pt-5 text-center">
    <div class="row">
      <div class="col-12 d-flex justify-content-around my-4">
        <h1>
          {{ game.name }}
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-lg-4 me-2 card">
        <img :src="game.background_image" alt="" class="img-fluid">
        <button @click="createTrackedGame(game.id)" class="btn btn-info">
          Follow game
        </button>
      </div>
      <div class="col-lg-6 ms-2 card description-card scrollable-y">
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
      <div class="col-5 me-2 p-5 card">
        related games
      </div>
      <div class="col-5 ms-2 p-5 card">
        trailer/pictures
      </div>
    </div>
  </div>
  <div class="row">
    <GameCard />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop.js'
import { gamesSearchService } from '../services/GamesSearchService.js'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { trackedGamesService } from '../services/TrackedGamesService.js'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await gamesSearchService.getGameById(route.params.gameId)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      game: computed(() => AppState.game),
      async createTrackedGame(gameId) {
        try {
          await trackedGamesService.createTrackedGame(gameId)
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
</style>
