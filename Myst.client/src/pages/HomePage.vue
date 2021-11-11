<template>
  <div class="d-fluid row align-items-center">
    <div class="row banner">
      <h2
        class="text-shadow animate__animated animate__fadeIn center mt-4"
        v-if="profile.name"
      >
        Welcome, {{ profile.name }}
      </h2>
      <div class="order-1 order-md-2 centerPic">
        <img
          src="../assets/img/Logo-Final2.gif"
          alt="MYST LOGO"
          class="
            img-flex
            midRound
            shadow-lg
            animate__animated animate__bounceIn
            w-50
            h-75
            center
          "
        />
      </div>
    </div>
    <div class="row center">
      <div class=" text-shadow mt-4">
        <h4 class="center">
          Your Current Library..
        </h4>
        <div class="text-light rounded order-2 order-md-1 centerGame" v-if="followedGames">
          <button
            class="btn btn-outline text-shadow glow bigRound m-2"
            @click="gamesOffset -= 2"
            v-if="gamesOffset > 0"
            title="Previous Page"
          >
            <i class="mdi mdi-chevron-left f-20 text-shadow"></i>
          </button>

          <FollowedGame
            v-for="f in followedGames"
            :key="f.id"
            :followed-game="f"
          />
          <button
            class="btn btn-outline text-shadow glow bigRound m-2"
            @click="gamesOffset += 2"
            v-if="gamesOffset <= 2"
            title="Next Page"
          >
            <i class="mdi mdi-chevron-right f-20 text-shadow"> </i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="
      news
      d-flex
      m-2
      p-1
      flex-column
      align-items-center
      justify-content-center
    "
  >
    <div class="row news-card midRound glow bg-primary">
      <div class="row p-2">
        <div
          class="d-flex text-shadow animate__animated animate__jackInTheBox"
          title="Daily Gaming News"
        >
          <h1>The Daily News Drop!</h1>
        </div>
      </div>
      <NewsCard2 v-for="n in news" :key="n.id" :news="n" />
      <div class="row p-2">
        <div class="col d-flex justify-content-start">
          <button
            class="btn btn-outline-dark shadow"
            @click="newsOffset -= 10"
            v-if="newsOffset > 0"
            title="Previous Page"
          >
            <i class="mdi mdi-chevron-triple-left f-20">Previous</i>
          </button>
        </div>
        <div class="col d-flex justify-content-end">
          <button
            class="btn btn-outline-dark shadow"
            @click="newsOffset += 10"
            v-if="newsOffset < 40"
            title="Next Page"
          >
            <i class="mdi f-20">Next</i>
            <i class="mdi mdi-chevron-triple-right f-20"> </i>
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
      news: computed(() =>
        AppState.news.slice(newsOffset.value, newsOffset.value + 10)
      ),
      games: computed(() => AppState.games),
      followedGames: computed(() =>
        AppState.followedGames.slice(gamesOffset.value, gamesOffset.value + 3)
      )
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 350px;
      max-width: 350px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
.news-card {
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
.news {
  display: grid;
  place-content: center;
  text-align: none;
  user-select: none;
  .news-card {
    width: 75vw;
    > img {
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
.library-card {
  height: 20rem;
  overflow-x: scroll;
  overflow-y: hidden;
}
.card-test {
  display: flex;
  flex-direction: row;
  background: black;
}
.text-shadow {
  color: white;
  text-shadow: 2px 2px 4px #000000;
}
.end {
  display: flex;
  justify-content: end;
}
.center {
  display: flex;
  justify-content: center;
  justify-content: space-around;
  align-self: center;
}
.centerPic {
  display: flex;
  justify-content: center;
}
.centerGame {
  display: flex;
  justify-content: center;
}
.downStack {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.bigRound {
  border-radius: 35px;
}
.midRound {
  border-radius: 15px;
}

.banner {
  margin-left: 0;
  width: 100%;
  // height: 100vh;
  min-height: 15em;
  background: linear-gradient(#000, transparent, #000), var(--img) 50% / cover;
  background-attachment: fixed;
  background-blend-mode: multiply;

  &:nth-of-type(1) {
    --img: url(../src/assets/img/Game.jpg);
  }

  &:nth-of-type(2) {
    --img: url(../src/assets/img/Game.jpg);
  }

  &:nth-of-type(3) {
    --img: url(../src/assets/img/Game.jpg);
  }

  &:nth-of-type(4) {
    --img: url(../src/assets/img/Game.jpg);
  }

  &:nth-of-type(5) {
    --img: url(../src/assets/img/Game.jpg);
  }

  &:nth-of-type(6) {
    --img: url(../src/assets/img/Game.jpg);
  }
}
</style>
