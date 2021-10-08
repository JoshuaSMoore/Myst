<template>
  <div class="row m-5 p-0">
    <GameCard v-for="g in games" :key="g.id" :game="g" class="m-2" />
    <div v-if="currentPage > 0 && totalpages > 0 && query">
      <button class="selectable" v-for="page in totalPages" :key="page" @click="getPage(page)">
        {{ page }}
      </button>
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
      totalPages: computed(() => AppState.totalPages),
      currentPage: computed(() => AppState.currentPage),
      async getPage(page) {
        try {
          await gamesSearchService.getGamesSearched(query.value, page)
        } catch (error) {
          Pop.toast(error, 'error finding page')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
