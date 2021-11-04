<template>
  <div class="container-fluid pt-5">
    <!--NOTE Game Picture and Description -->
    <div class="row center">
      <div class="col-lg-4 me-2 roundedNew">
        <img
          :src="game.background_image"
          alt=""
          class="img-fluid rounded my-2"
        />
        <div class="">
          <div v-if="gameFollowCheck">
            <button
              @click="deleteTrackedGame(game.id)"
              class="btn btn-outline-warning"
            >
              Unfollow game
            </button>
          </div>
          <div v-else>
            <button
              @click="createTrackedGame(game.id)"
              class="btn btn-outline-primary"
            >
              <b>Follow game</b>
            </button>
          </div>
        </div>
      </div>
      <!-- NOTE Description -->
      <div class="col-lg-6 ms-2 text-shadow description-card scrollable-y">
        <div class="row center" v-if="game.esrb_rating">
          <div class="col">
            <h2 class="text-shadow center">
              {{ game.name }}
            </h2>
          </div>
          <!-- NOTE Ratings -->
          <div class="col center">
            <h4 v-if="game.esrb_rating.id === 1">
              <img src="../assets/img/everyone.png" />
            <!-- {{ game.esrb_rating.name }} -->
            </h4>
            <h4 v-if="game.esrb_rating.id === 2">
              <img src="../assets/img/everyone10.png" />
            <!-- {{ game.esrb_rating.name }} -->
            </h4>
            <h4 v-if="game.esrb_rating.id === 3">
              <img src="../assets/img/teen.png" />
            <!-- {{ game.esrb_rating.name }} -->
            </h4>
            <h4 v-if="game.esrb_rating.id === 4">
              <img src="../assets/img/mature.png" />
            <!-- {{ game.esrb_rating.name }} -->
            </h4>
            <h4 v-if="game.esrb_rating.id === 5">
              <img src="../assets/img/adults.png" />
            <!-- {{ game.esrb_rating.name }} -->
            </h4>
            <h4 v-if="game.esrb_rating.id === 6">
              <img src="../assets/img/ratingPending.png" />
            <!-- {{ game.esrb_rating.name }} -->
            </h4>
          </div>
        </div>
        <div class="row underline">
          <div class="col center">
            <h4>
              <i class="mdi mdi-star f-20">{{ game.rating }} </i>
            </h4>
          </div>
          <div class="col center">
            <h4>
              <h4>Released: {{ game.released }}</h4>
            </h4>
          </div>
        </div>
        <div class="row">
          <p>
            {{ game.description_raw }}
          </p>
        </div>
        <div class="text-end">
          <a :href="game.website" class="btn btn-outline-light"> Visit Site </a>
        </div>
        <div class="row underline">
          <h5><em>Platforms</em></h5>
        </div>
        <div class="row">
          <div class="col d-flex">
            <GamePlatforms v-for="p in game.platforms" :key="p.id" :platform="p" />
          </div>
        </div>
        <div class="row underline">
          <h5>
            <em><b>Genres</b></em>
          </h5>
        </div>
        <div class="row">
          <div class="col-4 d-flex">
            <GameGenres v-for="g in game.genres" :key="g.id" :genre="g" />
          </div>
        </div>
      </div>
    </div>
    <!-- NOTE Game Followers -->
    <div class="row center">
      <div class="col-1 text-center on-hover">
        <button
          class="btn btn-prev-next"
          @click="scroll('left', 'friendScroll')"
          v-if="true"
        >
          <i class="mdi mdi-chevron-left"></i>
        </button>
      </div>
      <div class="col-10 friends text-light my-2 scrollCard smoothScroll" id="friendScroll">
        <GameFollower v-for="t in gameFollowers" :key="t.id" :tracker="t" />
      </div>
      <div class="col-1 text-center on-hover">
        <button
          class="btn btn-prev-next"
          @click="scroll('right', 'friendScroll')"
          v-if="true"
        >
          <i class="mdi mdi-chevron-right"></i>
        </button>
      </div>
    </div>
    <!-- NOTE Related Games and ScreenShots -->
    <div class="row center">
      <!-- NOTE Related Games -->
      <div class="col-5 m-2 text-shadow m-3">
        <h3>Related Games</h3>
        <div class="row justify-content-center">
          <div class="col-1 text-center on-hover">
            <button
              class="btn btn-prev-next"
              @click="scroll('left', 'relatedScroll')"
              v-if="true"
            >
              <i class="mdi mdi-chevron-left"></i>
            </button>
          </div>
          <div class="col-10 d-flex scrollCard smoothScroll" id="relatedScroll">
            <RelatedGame
              v-for="g in relatedGames"
              :key="g.id"
              :related-game="g"
            />
          </div>
          <div class="col-1 text-center on-hover">
            <button
              class="btn btn-prev-next"
              @click="scroll('right', 'relatedScroll')"
              v-if="true"
            >
              <i class="mdi mdi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      <!-- NOTE SCREENSHOTS -->
      <div class="col-5 m-2 text-shadow m-3">
        <h3>Game Screenshots</h3>
        <div class="row justify-content-center">
          <div class="col-1 text-center on-hover">
            <button
              class="btn btn-prev-next"
              @click="scroll('left', 'gameScroll')"
              v-if="true"
            >
              <i class="mdi mdi-chevron-left"></i>
            </button>
          </div>
          <div class="col-10 d-flex scrollCard smoothScroll" id="gameScroll">
            <GameScreenshots
              v-for="g in gameScreenShots"
              :key="g.id"
              :screen-shot="g"
            />
          </div>
          <div class="col-1 text-center on-hover">
            <button
              class="btn btn-prev-next"
              @click="scroll('right', 'gameScroll')"
              v-if="true"
            >
              <i class="mdi mdi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop.js'
import { gamesSearchService } from '../services/GamesSearchService.js'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { trackedGamesService } from '../services/TrackedGamesService.js'

export default {
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      if (route.params.gameId) {
        await gamesSearchService.getGameById(route.params.gameId)
      }
    })
    onMounted(async() => {
      try {
        await trackedGamesService.getTrackedGamesByGameId(route.params.gameId)
        await trackedGamesService.checkTracked()
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      game: computed(() => AppState.game),
      relatedGames: computed(() => AppState.relatedGames),
      gameScreenShots: computed(() => AppState.gameScreenShots),
      gameFollowers: computed(() => AppState.gameFollowers),
      gameFollowCheck: computed(() => AppState.gameFollowCheck),

      async createTrackedGame(gameId) {
        try {
          await trackedGamesService.createTrackedGame(gameId)
          await trackedGamesService.checkTracked()
          Pop.toast("you've followed this game!", 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async deleteTrackedGame(gameId) {
        try {
          await trackedGamesService.deleteTrackedGame(gameId)
          await trackedGamesService.checkTracked()
          Pop.toast("you've unfollowed this game", 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      scroll(dir, elementId) {
        const scrollAmmount = 400
        const element = document.getElementById(elementId)
        switch (dir) {
          case 'right':
            element.scrollTo({
              left: element.scrollLeft + scrollAmmount,
              behavior: 'smooth'
            })
            break
          case 'left':
            element.scrollTo({
              left: element.scrollLeft - scrollAmmount,
              behavior: 'smooth'
            })
            break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.description-card {
  height: 25rem;
}
.scroll-card {
  height: 15rem;
  overflow-x: scroll;
  overflow-y: hidden;
}
.follower-card {
  overflow-x: scroll;
  overflow-y: hidden;
}
.follower-card ::-webkit-scrollbar {
  display: none;
}

.smoothScroll {
  flex-wrap: nowrap !important;
  overflow-x: scroll;
  overflow: hidden;
  scroll-snap-type: x mandatory;
  &::-webkit-scrollbar {
  }
  &::-webkit-scrollbar-button {
    /* 2 / }
  &::-webkit-scrollbar-track{ / 3 / }
  &::-webkit-scrollbar-track-piece{  background-color: rgba(255, 255, 255, 0.541); border-radius: 45%; }
  &::-webkit-scrollbar-thumb{ background-color: rgba(255, 255, 255, 0.541); border-radius: 45%;}
  &::-webkit-scrollbar-corner{ / 6 */
  }
}
.smoothScroll div {
  scroll-snap-align: start;
}

.btn-prev-next {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.63);
  color: black;
  scroll-behavior: smooth;
}
.friends {
  display: flex;
  flex-direction: row;
}
.text-shadow {
  color: white;
  text-shadow: 2px 2px 4px #000000;
}
.center {
display: flex;
  justify-content: center;
  align-items: center;
}
.roundedNew {
  border-radius: 35px;
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
.underline{
  border-bottom: 2px solid #fff;
}
</style>
