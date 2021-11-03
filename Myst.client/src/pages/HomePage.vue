<template>
  <div class="d-fluid row align-items-center m-5 ">
    <h2 class="text-shadow animate__animated animate__rotateInDownLeft end" v-if="profile.name">
      Welcome, {{ profile.name }}
    </h2>
    <div class="row center">
      <div class="col-3 text-shadow">
        <h4>
          Your Current Library..
        </h4>
        <div class="card bg-dark text-light rounded order-2 order-md-1" v-if="followedGames">
          <button class="btn btn-dark shadow" @click="gamesOffset -=2" v-if="gamesOffset > 0" title="Previous Page">
            <i class="mdi mdi-chevron-up f-20 "></i>
          </button>
          <FollowedGame v-for="f in followedGames" :key="f.id" :followed-game="f" />
          <button class="btn btn-dark shadow" @click="gamesOffset +=2" v-if="gamesOffset <= 2" title="Next Page">
            <i class="mdi f-20 "></i> <i class="mdi mdi-chevron-down f-20 ">
            </i>
          </button>
        </div>
      </div>
      <div class="col-6 rounded align-self-center order-1 order-md-2">
        <img src="../assets/img/Logo-Final2.gif" alt="MYST LOGO" class="img-flex rounded shadow-lg  animate__animated animate__bounceIn w-100">
      </div>
    </div>
  </div>
  <div class="news d-flex m-2 p-1 flex-column align-items-center justify-content-center">
    <div class="row news-card rounded shadow bg-primary">
      <div class="row p-2">
        <div class="d-flex text-shadow animate__animated animate__jackInTheBox" title="Daily Gaming News">
          <h1>The Daily News Drop!</h1>
        </div>
      </div>
      <NewsCard2 v-for="n in news" :key="n.id" :news="n" />
      <div class="row p-2">
        <div class="col d-flex justify-content-start">
          <button class="btn btn-outline-dark shadow" @click="newsOffset -=10" v-if="newsOffset > 0" title="Previous Page">
            <i class="mdi mdi-chevron-triple-left f-20 ">Previous</i>
          </button>
        </div>
        <div class="col d-flex justify-content-end">
          <button class="btn btn-outline-dark shadow" @click="newsOffset +=10" v-if="newsOffset < 40" title="Next Page">
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
        logger.log('this is your user information on load', AppState.user)
        if (AppState.user.isAuthenicated) {
          await accountService.getTrackedGames(AppState.account.id)
          await trackedGamesService.getTrackedGames()
        }
      } catch (error) {
        Pop.toast(error, 'Error')
      }
    })
    return {
      newsOffset,
      gamesOffset,
      account: computed(() => AppState.account),
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
.news-card{
  justify-content: center;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
animation: gradient 15s ease infinite;
}
@keyframes gradient {
0% {
background-position: 0% 50%;
}
50% {
background-position: 100% 50%;
}
100% {
background-position: 0% 50%;
}
}
.news{
  display: grid;
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
.text-shadow{
  color: white;
  text-shadow: 2px 2px 4px #000000;
}
.end{
  display: flex;
  justify-content: end;
}
.center{
  display: flex;
  justify-content: center;
  justify-content: space-around;
  align-self: center;
}
</style>
