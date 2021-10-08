<template>
  <div class="row m-5 p-0">
    <h3> Test Search Page</h3>
    <GameCard v-for="g in games" :key="g.id" :game="g" class="m-2" />
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
// import { gamesSearchService } from '../services/GamesSearchService'
// import Pop from '../utils/Pop'
export default {
  setup() {
    // onMounted(async() => {
    //   try {
    //     await gamesSearchService.getGames()
    //   } catch (error) {
    //     Pop.toast(error, 'you done messed up')
    //   }
    // })
    return {
      games: computed(() => AppState.games)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
