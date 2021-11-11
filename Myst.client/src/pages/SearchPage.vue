<template>
  <div class="container-fluid">
    <div class="row my-5 p-0 align-items-center d-flex justify-content-center">
      <div class="text-muted text-Light mt-3">
        <h2>Search Results Page {{ currentPage }} </h2>
      </div>
    </div>
    <div v-if="games" class="row styles">
      <GameSearchCard v-for="g in games" :key="g.id" :game="g" class="col-3 m-2 styles" />
    </div>
    <div v-if="searchedAccounts" class="row styles">
      <AccountSearchCard v-for="s in searchedAccounts" :key="s.id" :account="s" lass="col-3 m-2 styles" />
    </div>
    <div class="row mb-5">
      <div class="col-12 d-flex justify-content-around">
        <button class="btn btn-outline-secondary glow" @click="getOld()" v-if="previous">
          <i class="mdi mdi-chevron-triple-left f-20">Previous</i>
        </button>
        <div v-if="!previous"></div>
        <div class="text-muted text-Light m-2">
          <h2>Search Results Page {{ currentPage }} </h2>
        </div>
        <button class="btn btn-outline-secondary glow" @click="getNew()" v-if="next">
          <i class="mdi f-20">Next</i>
          <i class="mdi mdi-chevron-triple-right f-20"> </i>
        </button>
        <div v-if="!next"></div>
      </div>
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
      searchedAccounts: computed(() => AppState.searchedAccounts),
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
.styles{
  display: flex;
  justify-content: center;
}
.glow {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.548);
  transition: 0.3s;
}
/* On mouse-over, add a deeper shadow */
.glow:hover {
  box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.829);
}
</style>
