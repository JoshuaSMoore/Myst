<template>
  <div class="d-fluid row align-items-center m-5 " style="justify-content: space-evenly">
    <h2 class="text-white  animate__animated animate__rotateInDownLeft" v-if="profile.name">
      Welcome, {{ profile.name }}
    </h2>
    <div class="col-3">
      <h4>
        Game Library
      </h4>
      <div class="card-test  text-light rounded order-2 order-md-1" v-if="followedGames">
        <button class="btn btn-dark shadow" @click="gamesOffset -=2" v-if="gamesOffset > 0" title="Previous Page">
          <i class="mdi mdi-chevron-left f-20 "></i>
        </button>
        <FollowedGame v-for="f in followedGames" :key="f.id" :followed-game="f" class="m-2 bg-dark  animate__animated animate__backInLeft" />
        <button class="btn btn-dark shadow" @click="gamesOffset +=2" v-if="gamesOffset <= 2" title="Next Page">
          <i class="mdi f-20 "></i> <i class="mdi mdi-chevron-right f-20 ">
          </i>
        </button>
      </div>
    </div>
    <div class="col-6 rounded text-center order-1 order-md-2">
      <img src="../assets/img/Logo-Final2.gif" alt="MYST LOGO" class="img-flex rounded shadow-lg  animate__animated animate__bounceIn w-100">
    </div>
  </div>
  <div class="news d-flex m-2 p-1 flex-column align-items-center justify-content-center">
    <div class="row news-card justify-content-center rounded elevation-3 bg-primary">
      <div class="row p-2">
        <div class="col d-flex justify-content-around">
          <button class="btn btn-primary " @click="newsOffset -=10" v-if="newsOffset > 0" title="Previous Page">
            <i class="mdi mdi-chevron-triple-left f-20 ">Previous</i>
          </button>
        </div>
        <div class="col d-flex justify-content-around text-light animate__animated animate__jackInTheBox" title="Daily Gaming News">
          <i class="mdi mdi-google-controller f-20">NEWS <i class="mdi mdi-google-controller f-20"></i></i>
        </div>
        <div class="col d-flex justify-content-around">
          <button class="btn btn-primary " @click="newsOffset +=10" v-if="newsOffset < 40" title="Next Page">
            <i class="mdi f-20 ">Next</i> <i class="mdi mdi-chevron-triple-right f-20 ">
            </i>
          </button>
        </div>
      </div>
      <NewsCard2 v-for="n in news" :key="n.id" :news="n" class="m-5" />
      <div class="row p-2">
        <div class="col d-flex justify-content-around">
          <button class="btn btn-dark shadow" @click="newsOffset -=10" v-if="newsOffset > 0" title="Previous Page">
            <i class="mdi mdi-chevron-triple-left f-20 ">Previous</i>
          </button>
        </div>
        <div class="col d-flex justify-content-around">
          <button class="btn btn-dark shadow" @click="newsOffset +=10" v-if="newsOffset < 40" title="Next Page">
            <i class="mdi f-20 ">Next</i> <i class="mdi mdi-chevron-triple-right f-20 ">
            </i>
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
import { accountService } from '../services/AccountService'
import { trackedGamesService } from '../services/TrackedGamesService'
import { logger } from '../utils/Logger.js'
import 'animate.css'
export default {
  name: 'Home',
  setup() {
    const newsOffset = ref(0)
    const gamesOffset = ref(0)
    onMounted(async() => {
      try {
        await newsService.getNews()
      } catch (error) {
        Pop.toast(error, 'Error grabbing news')
      }
      try {
        logger.log(AppState.profile)
        await accountService.getTrackedGames(AppState.profile.id)
        await trackedGamesService.getTrackedGames()
      } catch (error) {
        Pop.toast(error, 'Error')
      }
    })
    return {
      newsOffset,
      gamesOffset,
      profile: computed(() => AppState.profile),
      news: computed(() => AppState.news.slice(newsOffset.value, newsOffset.value + 10)),
      games: computed(() => AppState.games),
      followedGames: computed(() => AppState.followedGames.slice(gamesOffset.value, gamesOffset.value + 2))
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
      height: 350px;
      max-width: 350px;
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
html {
  scroll-behavior: smooth;
}
.library-card{
  height: 20rem;
  overflow-x: scroll;
  overflow-y: hidden;
}
.card-test{
  display: flex;
  flex-direction: row;
  background: black
}

</style>
