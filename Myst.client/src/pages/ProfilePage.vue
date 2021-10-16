<template>
  <div class="d-fluid">
    <div class="
       row"
    >
      <div class="col-12">
        <h2 class="m-5">
          Welcome, {{ profile.name }}
        </h2>
      </div>
    </div>

    <div class="row m-5 bg-dark text-light rounded justify-content-center wow">
      <div class="col m-5">
        <div class="bg-dark m-5 text-light d-flex justify-content-center align-items-center">
          <iframe
            :src="`https://player.twitch.tv/?channel=${profile.twitch}&parent=localhost`"
            width="800px"
            height="400px"
          >
          </iframe>
        </div>
      </div>

      <div class="col mx-5 text-center">
        <img class="rounded justify-content-center m-5 wow" :src="profile.picture" alt="" height="400" width="400" />
        <div v-if="profile.bio" class="m-1">
          <h3 class="fw-bold">
            About me..:
          </h3> <h4 class="fw-bold">
            {{ profile.bio }}
          </h4>
        </div>
      </div>
      <div class="row">
        <ul class="text-center justify-content-center">
          <li>
            <div class="text-light bg-dark">
              <!-- {{ profile.twitch }} -->
            </div>
            <a :href=" `https://www.twitch.com/`+profile.twitch" v-if="profile.twitch" class="m-1">
              <i class="mdi mdi-twitch icon"></i>
            </a>
          </li>
          <li>
            <a :href="profile.github" v-if="profile.github" class="m-1">
              <i class="mdi mdi-github icon"></i>
            </a>
          </li>
          <li>
            <div class="text-light bg-dark">
              <!-- {{ profile.steam }} -->
            </div>
            <a :href="`https://steamcommunity.com/id/`+profile.steam" v-if="profile.steam" class="m-1">
              <i class="mdi mdi-steam icon"></i>
            </a>
          </li>

          <li class="xbox" id="xbox">
            <div class="text-light bg-dark">
            </div>
            <a :href="`https://account.xbox.com/en-us/profile?gamertag=`+profile.xbox" v-if="profile.xbox" class="m-1" title="Xbox">
              <i class="mdi mdi-microsoft-xbox icon"></i>
            </a>
          </li>

          <li>
            <div class="text-light bg-dark">
              <!-- {{ profile.playstation }} -->
            </div>
            <a :href="`https://psnprofiles.com/`+profile.playstation" v-if="profile.playstation" class="m-1">
              <i class="mdi mdi-sony-playstation icon"></i>
            </a>
          </li>

          <li>
            <div class="text-light bg-dark">
              <!-- {{ profile.nintendo }} -->
            </div>
            <a :href="`https://www.google.com/search?q=nintendo+user`+profile.nintendo" v-if="profile.nintendo" class="m-1">
              <i class="mdi mdi-nintendo-switch icon"></i>
            </a>
          </li>
        </ul>
      </div>
      <!-- NOTE end of cool things -->
      <div class="row rounded text-light m-5 justify-content-center">
        <h5 class="fw-bold ms-5 rounded">
          {{ profile.name }}, these are your friends!
        </h5>
        <div class="row mx-5 rounded justify-content-center ">
          <div class="col-1 on-hover">
            <button class="btn btn-prev-next" @click="scroll('left', 'followScroll')" v-if="true">
              <i class="mdi mdi-chevron-left f-20 text-light"></i>
            </button>
          </div>
          <div class="col-10 d-flex screenshot-card smoothScroll" id="followScroll">
            <Following v-for="f in following" :key="f.id" :following="f" />
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
      <h1 class="
         fw-bold
         ps-3
         rounded"
      >
        Game Library
      </h1>
      <div class="row mb-4 mx-5 bg-dark rounded justify-content-center wow ">
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
    <div class="mx-5 text-light ">
      <h1 class="fw-bold
         ps-3
         rounded"
      >
        Posts
        <button v-if="user.isAuthenticated" class="btn btn-info w-25 ms-2" type="button" data-bs-toggle="modal" data-bs-target="#post-form">
          Create a Post
        </button>
      </h1>
      <div class="row mx-5 mb-5 bg-dark rounded justify-content-center wow">
        <div class="col-1 text-center on-hover">
          <button class="btn btn-prev-next" @click="scroll('left', 'postScroll')" v-if="true">
            <i class="mdi mdi-chevron-left f-20 text-light"></i>
          </button>
        </div>
        <div class="col-10 d-flex screenshot-card smoothScroll justify-content-center" id="postScroll">
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
  </div>
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
</style>
