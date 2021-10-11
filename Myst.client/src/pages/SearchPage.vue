<template>
  <div class="row m-5 p-0 align-items-center d-flex justify-content-center">
    <div class="text-muted text-dark text-center mt-3">
      <h2> PAGE {{ currentPage }} </h2>
    </div>
    <GameSearchCard v-for="g in games" :key="g.id" :game="g" class="m-2" />
    <div class="col-12 d-flex justify-content-around">
      <button class="btn btn-secondary" @click="getOld()" v-if="previous">
        Previous
      </button>
      <div v-if="!previous"></div>
      <div class="text-muted text-dark">
        <h2> PAGE {{ currentPage }} </h2>
      </div>
      <button class="btn btn-secondary" @click="getNew()" v-if="next">
        Next
      </button>
      <div v-if="!next"></div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { gamesSearchService } from '../services/GamesSearchService'
import Pop from '../utils/Pop'
// import { gamesSearchService } from '../services/GamesSearchService'
// import Pop from '../utils/Pop'
export default {
  setup() {
    const query = ref('')
    // onMounted(async() => {
    //   try {
    //     await gamesSearchService.getGames()
    //   } catch (error) {
    //     Pop.toast(error, 'you done messed up')
    //   }
    // })
    return {
      query,
      games: computed(() => AppState.games),
      page: computed(() => AppState.page),
      next: computed(() => AppState.next),
      previous: computed(() => AppState.previous),
      currentPage: computed(() => AppState.currentPage),
      async getNew() {
        try {
          await gamesSearchService.getNew(AppState.currentPage)
        } catch (error) {
          Pop.toast('error', error)
        }
      },
      async getOld() {
        try {
          await gamesSearchService.getOld(AppState.currentPage)
        } catch (error) {
          Pop.toast('error', error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
