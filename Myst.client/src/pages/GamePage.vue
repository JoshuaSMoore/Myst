<template>
  <div class="container-fluid pt-5 text-center">
    <div class="row">
      <h1>
        {{ game.name }}
      </h1>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-4 me-2 card">
        <img :src="game.background_image" alt="">
      </div>
      <div class="col-6 ms-2 card">
        <p>
          <b> game description: </b>
          {{ game.description_raw }}
        </p>
        <GamePlatforms v-for="p in game.platforms" :key="p.id" :platform="p" />
        <GameGenres v-for="g in game.genres" :key="g.id" :genre="g" />
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
import { logger } from '../utils/Logger.js'
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
      game: computed(() => AppState.game)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
