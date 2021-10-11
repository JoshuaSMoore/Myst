<template>
  <div class="row m-5 p-0">
    <GameSearchCard v-for="g in games" :key="g.id" :game="g" class="m-2" />
    <div class="col-12 d-flex justify-content-around">
      <button class="btn btn-secondary" @click="getOld()" v-if="page.new">
        Previous
      </button>
      <div v-if="!page.new"></div>
      <div class="text-muted text-dark">
        {{ page.new }}
      </div><div v-if="!page.old"></div>
      <button class="btn btn-secondary" @click="getNew()" v-if="page.old">
        Next
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
      page: computed(() => AppState.page),
      currentPage: computed(() => AppState.currentPage),
      async getNew() {
        try {
          await gamesSearchService.getNew()
        } catch (error) {
          Pop.toast('error', error)
        }
      },
      async getOld() {
        try {
          await gamesSearchService.getOld()
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
