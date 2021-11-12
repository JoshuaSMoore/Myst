<template>
  <div class="container" v-if="profile">
    <div class="row">
      <div class="col-12">
        <h2 class="my-5 text-shadow">
          Welcome to {{ profile.name }}'s Profile
        </h2>
      </div>
    </div>

    <div class="col-12">
      <div class="profile-card container text-light">
        <div class="row">
          <div class="col m-2">
            <div class=" text-light d-flex justify-content-center align-items-center">
              <iframe
                :src="`https://player.twitch.tv/?channel=${profile.twitch}&parent=mystgaming.herokuapp.com`"
                width="500px"
                height="300px"
                class="bigRound glow"
              >
              </iframe>
            </div>
          </div>
          <!-- NOTE INFO -->
          <div class="col m-2 display-flex align-items-center">
            <img class="bigRound glow img-fluid" :src="profile.picture" alt="" height="400" width="400" />
            <div v-if="profile.bio" class="m-1">
              <h3 class="fw-bold">
                About me..:
              </h3> <h4 class="fw-bold">
                {{ profile.bio }}
              </h4>
            </div>
          </div>
        </div>
        <div class="m-2 row">
          <ul class="text-center center wrapper">
            <li>
              <div class="text-light">
                <!-- {{ profile.twitch }} -->
              </div>
              <a :href=" `https://www.twitch.com/`+profile.twitch" v-if="profile.twitch" class="m-1 glow" target="_blank" rel="noreferrer noopener">
                <i class="mdi mdi-twitch icon"></i>
              </a>
            </li>
            <li>
              <a :href="profile.github" v-if="profile.github" class="m-1 glow" target="_blank" rel="noreferrer noopener">
                <i class="mdi mdi-github icon"></i>
              </a>
            </li>
            <li>
              <div class="text-light">
                <!-- {{ profile.steam }} -->
              </div>
              <a :href="`https://steamcommunity.com/id/`+profile.steam" v-if="profile.steam" class="m-1 glow" target="_blank" rel="noreferrer noopener">
                <i class="mdi mdi-steam icon"></i>
              </a>
            </li>

            <li class="xbox" id="xbox">
              <div class="text-light">
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
              <div class="text-light">
                <!-- {{ profile.playstation }} -->
              </div>
              <a :href="`https://psnprofiles.com/`+profile.playstation" v-if="profile.playstation" class="m-1 glow" target="_blank" rel="noreferrer noopener">
                <i class="mdi mdi-sony-playstation icon"></i>
              </a>
            </li>
            <li>
              <div class="text-light">
                <!-- {{ profile.nintendo }} -->
              </div>
              <a :href="`https://www.google.com/search?q=nintendo+user`+profile.nintendo" v-if="profile.nintendo" class="m-1 glow" target="_blank" rel="noreferrer noopener">
                <i class="mdi mdi-nintendo-switch icon"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- NOTE end of cool buttons -->
      <div class="row text-shadow rounded m-1 center">
        <h5 class="fw-bold ps-3 rounded">
          {{ profile.name }}'s friends!
        </h5>
        <div class="row rounded mb-2">
          <div class="col-1 text-center on-hover">
            <button class="btn btn-prev-next" @click="scroll('left', 'followScroll')" v-if="true">
              <i class="mdi mdi-chevron-left f-20 text-light"></i>
            </button>
          </div>
          <div class="col-10 center screenshot-card smoothScroll mb-2" id="followScroll">
            <Following v-for="f in following" :key="f.id" :following="f" />
          </div>
          <div class="col-1 text-center on-hover">
            <button class="btn btn-prev-next" @click="scroll('right', 'followScroll')" v-if="true">
              <i class="mdi mdi-chevron-right f-20 text-light"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-5">
      <div class="d-flex justify-content-end">
        <i class="mdi mdi-cog f-20 text-light" type="button" data-bs-toggle="modal" data-bs-target="#profile-form">
        </i>
      </div>
    </div>
  </div>

  <!-- NOTE followed games -->
  <div class="mx-5 text-light ">
    <h1 class="fw-bold ps-3 rounded">
      Game Library
    </h1>
    <div class="row">
      <div class="col-1 text-center on-hover">
        <button class="btn btn-prev-next" @click="scroll('left', 'gameScroll')" v-if="true">
          <i class="mdi mdi-chevron-left f-20 text-light"></i>
        </button>
      </div>
      <div class=" col-10 d-flex screenshot-card smoothScroll" id="gameScroll">
        <FollowedGame v-for="f in followedGames" :key="f.id" :followed-game="f" />
      </div>
      <div class="col-1 text-center on-hover">
        <button class="btn btn-prev-next" @click="scroll('right', 'gameScroll')" v-if="true">
          <i class="mdi mdi-chevron-right f-20 text-light"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- END FOLLOWED GAME NOTE START POSTS -->
  <div class="text-light ">
    <div class="row d-flex">
      <div class="col-2 center mx-2">
        <h1 class="fw-bold ps-3 rounded">
          Posts
        </h1>
      </div>
      <div class="col mx-1 btn-center">
        <button v-if="user.isAuthenticated" class="btn btn-outline-primary " type="button" data-bs-toggle="modal" data-bs-target="#post-form">
          Create a Post
        </button>
      </div>
    </div>
    <div class="row rounded justify-content-space-evenly center">
      <div class="col-1 text-center on-hover">
        <button class="btn btn-prev-next" @click="scroll('left', 'postScroll')" v-if="true">
          <i class="mdi mdi-chevron-left f-20 text-light"></i>
        </button>
      </div>
      <div class="col-8 screenshot-card smoothScroll d-flex" id="postScroll">
        <Post v-for="p in posts" :key="p.id" :post="p" />
      </div>
      <div class="col-1 text-center on-hover">
        <button class="btn btn-prev-next" @click="scroll('right', 'postScroll')" v-if="true">
          <i class="mdi mdi-chevron-right f-20 text-light"></i>
        </button>
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
import { AppState } from '../AppState.js'
import { postsService } from '../services/PostsService.js'
import Pop from '../utils/Pop.js'
import { accountService } from '../services/AccountService.js'
import { trackedGamesService } from '../services/TrackedGamesService.js'
import { useRoute } from 'vue-router'
import { followService } from '../services/FollowService.js'

export default {
  setup() {
    const route = useRoute()
    const canvasTest = ref('')
    const postsOffset = ref(0)
    watchEffect(async() => {
      if (route.params.profileId) {
        try {
          await postsService.getPostByProfileId(route.params.profileId)
        } catch (error) {
          Pop.toast(error, 'Error getting Posts')
        }
        try {
          await accountService.getTrackedGames(route.params.profileId)
          await trackedGamesService.getTrackedGames()
        } catch (error) {
          Pop.toast(error, 'error')
        }
        try {
          await followService.getFollowing(route.params.profileId)
          await followService.checkFollow()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    })
    return {
      postsOffset,
      profile: computed(() => AppState.profile),
      user: computed(() => AppState.user),
      posts: computed(() => AppState.usersPosts),
      followedGames: computed(() => AppState.followedGames),
      userPosts: computed(() => AppState.userPosts),
      post: computed(() => AppState.post),
      trackedGames: computed(() => AppState.trackedGames),
      following: computed(() => AppState.following),
      canvasTest,
      testCanvas() {
        const canvas = document.getElementById('canvas-test')
        const imageUrl = canvas.toDataURL('image/jpeg')
        const videoElm = document.getElementById('test')
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
// .profile-card{
//   width: 90rem;
//   height: 30rem;
// }
.canvas{
  position: absolute;
  outline: 1px red dotted;
  right: 0;
  top: 10;
  z-index: 10;
  width: 40vh;
  height: 40vh;
}
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
   &::-webkit-scrollbar{ }
  &::-webkit-scrollbar-button{ /* 2 / }
  &::-webkit-scrollbar-track{ / 3 / }
  &::-webkit-scrollbar-track-piece{  background-color: rgba(255, 255, 255, 0.541); border-radius: 45%; }
  &::-webkit-scrollbar-thumb{ background-color: rgba(255, 255, 255, 0.541); border-radius: 45%;}
  &::-webkit-scrollbar-corner{ / 6 */ }

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
/* On mouse-over, add a deeper shadow */
.glow:hover {
  box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.829);
}
  .bigRound{
    border-radius: 50px;
  }
.center{
  display: flex;
  justify-content: center;
}
.btn-center{
  display: flex;
  align-items: center;
}
.text-shadow{
  color: white;
  text-shadow: 2px 2px 4px #000000;
}
.wrapper{
  flex-wrap: inherit;
}
</style>
