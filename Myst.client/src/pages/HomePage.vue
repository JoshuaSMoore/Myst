<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 bg-dark rounded elevation-3">
      <img src="../assets/img/myst-logo.png" alt="MYST LOGO" class="rounded-circle">
      <h1 class="m-3 bg-dark text-white p-3 rounded text-center">
        Welcome
      </h1>
    </div>
  </div>
  <div class="news d-flex m-2 p-1 flex-column align-items-center justify-content-center">
    <div class="row news-card justify-content-center m-2 rounded elevation-3 bg-dark">
      <NewsCard v-for="n in news" :key="n.id" :news="n" class="m-5" />
      <div class="row ">
        <div class="col d-flex justify-content-around">
          <button class="btn btn-dark" @click="newsOffset -=10" v-if="newsOffset > 0">
            Previous
          </button>
        </div>
        <div class="col d-flex justify-content-around">
          <button class="btn btn-dark" @click="newsOffset +=10" v-if="newsOffset < 40">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { newsService } from '../services/NewsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const newsOffset = ref(0)
    onMounted(async() => {
      try {
        await newsService.getNews()
      } catch (error) {
        Pop.toast(error, 'Error grabbing news')
      }
    })
    return {
      newsOffset,
      news: computed(() => AppState.news.slice(newsOffset.value, newsOffset.value + 10)),
      games: computed(() => AppState.games)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.news{
  display: grid;
  // height: 50vh;
  place-content: center;
  text-align: none;
  user-select: none;
  .news-card{
    width: 75vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
