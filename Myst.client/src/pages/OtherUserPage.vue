<template>
  <div class="container" v-if="profile">
    <div class="row">
      <div class="col-12">
        <h2 class="my-5 text-shadow">
          Welcome to {{ profile.name }}'s Profile
        </h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class=" container text-light">
          <div class="row">
            <div class="col m-2">
              <div class="  text-light d-flex justify-content-center align-items-center">
                <iframe
                  :src="`https://player.twitch.tv/?channel=${profile.twitch}&parent=localhost`"
                  width="500px"
                  height="300px"
                  class="bigRound glow"
                >
                </iframe>
              </div>
            </div>
            <!-- NOTE INFO -->
            <div class="col m-2">
              <img class="bigRound glow" :src="profile.picture" alt="" height="400" width="400" />
              <div v-if="profile.bio" class="m-1">
                <h3 class="fw-bold">
                  About me..:
                </h3> <h4 class="fw-bold">
                  {{ profile.bio }}
                </h4>
              </div>
            </div>
            <div class="m-2 row">
              <ul class="text-center">
                <li>
                  <div class="text-light ">
                    <!-- {{ profile.twitch }} -->
                  </div>
                  <a :href=" `https://www.twitch.com/`+profile.twitch" v-if="profile.twitch" class="m-1 glow glow" target="_blank" rel="noreferrer noopener">
                    <i class="mdi mdi-twitch icon"></i>
                  </a>
                </li>
                <li>
                  <a :href="profile.github" v-if="profile.github" class="m-1 glow" target="_blank" rel="noreferrer noopener">
                    <i class="mdi mdi-github icon"></i>
                  </a>
                </li>
                <li>
                  <div class="text-light ">
                    <!-- {{ profile.steam }} -->
                  </div>
                  <a :href="`https://steamcommunity.com/id/`+profile.steam" v-if="profile.steam" class="m-1 glow" target="_blank" rel="noreferrer noopener">
                    <i class="mdi mdi-steam icon"></i>
                  </a>
                </li>

                <li class="xbox" id="xbox">
                  <div class="text-light ">
                  </div>
                  <a :href="`https://account.xbox.com/en-us/profile?gamertag=`+profile.xbox"
                     v-if="profile.xbox"
                     class="m-1 glow"
                     title="Xbox"
                     target="_blank"
                     rel="noreferrer noopener"
                  >
                    <i class="mdi mdi-microsoft-xbox icon"></i>
                  </a>
                </li>
                <li>
                  <div class="text-light ">
                    <!-- {{ profile.playstation }} -->
                  </div>
                  <a :href="`https://psnprofiles.com/`+profile.playstation" v-if="profile.playstation" class="m-1 glow" target="_blank" rel="noreferrer noopener">
                    <i class="mdi mdi-sony-playstation icon"></i>
                  </a>
                </li>
                <li>
                  <div class="text-light ">
                    <!-- {{ profile.nintendo }} -->
                  </div>
                  <a :href="`https://www.google.com/search?q=nintendo+user`+profile.nintendo" v-if="profile.nintendo" class="m-1 glow" target="_blank" rel="noreferrer noopener">
                    <i class="mdi mdi-nintendo-switch icon"></i>
                  </a>
                </li>
              </ul>
            </div>

            <!-- NOTE end of cool buttons -->
            <div class="row roundedtext-light">
              <h5 class="fw-bold ps-3 rounded">
                {{ profile.name }}'s friends!
              </h5>
              <div class="row rounded justify-content-center">
                <div class="col-1 text-center on-hover">
                  <button class="btn btn-prev-next" @click="scroll('left', 'followScroll')" v-if="true">
                    <i class="mdi mdi-chevron-left f-20 text-light"></i>
                  </button>
                </div>
                <div class="col-10 d-flex screenshot-card smoothScroll" id="followScroll">
                  <Following v-for="f in following" :key="f.id" :following="f" class="m-3" />
                  <div class="col-1 text-center on-hover">
                    <button class="btn btn-prev-next" @click="scroll('right', 'followScroll')" v-if="true">
                      <i class="mdi mdi-chevron-right f-20 text-light"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 d-flex justify-content-end">
              <i class="mdi mdi-plus f-20 text-light" type="button" @click="addFollower()" title="Follow!">
              </i>
              <i class="mdi mdi-minus f-20 text-light" type="button" @click="deleteFollower()" title="Unfollow ☹️">
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- NOTE followed games -->
    <div class="row rounded text-light">
      <h1 class="fw-bold ps-3 rounded">
        Game Library
      </h1>
      <div class="row  rounded justify-content-center">
        <div class="col-1 text-center on-hover">
          <button class="btn btn-prev-next" @click="scroll('left', 'gameScroll')" v-if="true">
            <i class="mdi mdi-chevron-left f-20 text-light"></i>
          </button>
        </div>
        <div class=" col-10 d-flex screenshot-card smoothScroll" id="gameScroll">
          <FollowedGame v-for="f in followedProfileGames" :key="f.id" :followed-game="f" class="m-3" />
        </div>
        <div class="col-1 text-center on-hover">
          <button class="btn btn-prev-next" @click="scroll('right', 'gameScroll')" v-if="true">
            <i class="mdi mdi-chevron-right f-20 text-light"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- NOTE Posts -->
    <div class="row pb-2 rounded text-light">
      <h2 class="fw-bold p-3 rounded">
        POSTS
      </h2>
      <div class="row  rounded justify-content-center ">
        <div class="col-1 text-center on-hover">
          <button class="btn btn-prev-next" @click="scroll('left', 'postScroll')" v-if="true">
            <i class="mdi mdi-chevron-left f-20 text-light"></i>
          </button>
        </div>
        <div class="col-10 d-flex screenshot-card smoothScroll" id="postScroll">
          <Post v-for="p in posts" :key="p.id" :post="p" class="m-3" />
        </div>
        <div class="col-1 text-center on-hover">
          <button class="btn btn-prev-next" @click="scroll('right', 'postScroll')" v-if="true">
            <i class="mdi mdi-chevron-right f-20 text-light"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <Modal id="profile-form">
    <template #modal-title>
      <h4>Update Profile</h4>
    </template>
    <template #modal-body>
      <ProfileForm />
    </template>
  </Modal>
  <Modal id="post-form">
    <template #modal-title>
      <h4>Create Post</h4>
    </template>
    <template #modal-body>
      <PostForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { accountService } from '../services/AccountService'
import { postsService } from '../services/PostsService'
import { trackedGamesService } from '../services/TrackedGamesService'
import { followService } from '../services/FollowService.js'
import { logger } from '../utils/Logger.js'

export default {
  setup() {
    const gamesOffset = ref(0)
    const postsOffset = ref(0)
    const peopleOffset = ref(0)
    const route = useRoute()
    // vvvvvv -- changed from watchEffect my Nick 11/3/21
    onMounted(async() => {
      if (route.params.otheruserId) {
        // await accountService.getAccountById(route.params.otheruserId)
      }
      try {
        await accountService.getAccountById(route.params.otheruserId)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
      try {
        await postsService.getPostByProfileId(route.params.otheruserId)
      } catch (error) {
        Pop.toast(error, 'Error getting Posts')
      }
      try {
        await accountService.getProfileGames(route.params.otheruserId)
        await trackedGamesService.getProfileGames()
      } catch (error) {
        Pop.toast(error, 'error')
      }
      try {
        await followService.getFollowing(route.params.otheruserId)
        await followService.checkFollow()
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    // onMounted(async() => {
    //   try {
    //     await accountService.getAccountById(route.params.otheruserId)
    //   } catch (error) {
    //     Pop.toast(error.message, 'error')
    //   }
    //   try {
    //     await postsService.getPostByProfileId(route.params.otheruserId)
    //   } catch (error) {
    //     Pop.toast(error, 'Error getting Posts')
    //   }
    //   try {
    //     await accountService.getTrackedGames(route.params.otheruserId)
    //     await trackedGamesService.getTrackedGames()
    //   } catch (error) {
    //     Pop.toast(error, 'error')
    //   }
    //   try {
    //     await followService.getFollowing(AppState.account.id)
    //     await followService.checkFollow()
    //   } catch (error) {
    //     Pop.toast(error.message, 'error')
    //   }
    // })
    return {
      gamesOffset,
      postsOffset,
      peopleOffset,
      profile: computed(() => AppState.otherUser),
      user: computed(() => AppState.user),
      posts: computed(() => AppState.usersPosts),
      followedProfileGames: computed(() => AppState.followedProfileGames),
      following: computed(() => AppState.following),
      async addFollower() {
        try {
          await followService.addFollower(route.params.otheruserId)
          await followService.getFollowing(AppState.profile.id)
          Pop.toast("You've followed this Gamer", 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async deleteFollower() {
        try {
          await followService.deleteFollower(route.params.otheruserId)
          Pop.toast("You've stopped following this Gamer", 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      scroll(dir, elementId) {
        const scrollAmmount = 600
        const element = document.getElementById(elementId)
        switch (dir) {
          case 'right':
            element.scrollTo({ left: element.scrollLeft + scrollAmmount, behavior: 'smooth' })
            break
          case 'left':
            element.scrollTo({ left: element.scrollLeft - scrollAmmount, behavior: 'smooth' })
            break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

body {
  margin: 0;
  padding:0;
  background: #262626;
}

ul {
  display: flex;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
}

ul li {
  list-style: none;
}

ul li a {
  width: 80px;
  height: 80px;
  background-color: #fff;
  text-align: center;
  line-height: 80px;
  font-size: 35px;
  margin: 0 10px;
  display: block;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  border: 3px solid #fff;
  z-index: 1;
}

ul li a .icon {
  position: relative;
  color: #262626;
  transition: .5s;
  z-index: 3;
}

ul li a:hover .icon {
  color: #fff;
  transform: rotateY(360deg);
}

ul li a:before {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f00;
  transition: .5s;
  z-index: 2;
}

ul li a:hover:before {
  top: 0;
}

ul li:nth-child(1) a:before{
  background: #a10fdb;
}
ul li:nth-child(2) a:before{
  background: #5d5d5d;
}
ul li:nth-child(3) a:before{
  background: #494848;
}
ul li:nth-child(4) a:before{
  background: #04b63f;
}
ul li:nth-child(5) a:before{
  background: #0018ee;
}
ul li:nth-child(6) a:before{
  background: #db0f0f;
}
.wow{
  box-shadow: 5px 5px 15px rgba(255, 0, 242, 0.863);
}

.smoothScroll{
  flex-wrap: nowrap !important;
  overflow-x: scroll;
  overflow: hidden;
  scroll-snap-type: x mandatory;

}
.smoothScroll div{
  scroll-snap-align: start;
}

.btn-prev-next{
  height: 100%;
  background-color: rgba(211, 16, 245, 0.322);
  color: black;
  scroll-behavior: smooth;
}
.glow {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.548);
  transition: 0.3s;
}
.bigRound{
  border-radius: 50px;
}
/* On mouse-over, add a deeper shadow */
.glow:hover {
  box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.829);
}
.center{
  display: flex;
  justify-content: center;
}
.text-shadow{
  color: white;
  text-shadow: 2px 2px 4px #000000;
}
</style>
