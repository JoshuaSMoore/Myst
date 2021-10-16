<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="my-5">
          Welcome, {{ profile.name }}
        </h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="profile-card container card bg-dark text-light">
          <div class="row">
            <div class="col m-2">
              <div class="bg-dark text-light d-flex justify-content-center align-items-center">
                <iframe
                  :src="`https://player.twitch.tv/?channel=${profile.twitch}&parent=localhost`"
                  width="500px"
                  height="300px"
                >
                </iframe>
              </div>
            </div>

            <div class="col m-2 text-center">
              <img class="rounded wow" :src="profile.picture" alt="" height="400" width="400" />
            </div>
            <div class="m-2 row">
              <p v-if="profile.bio" class="my-1">
                <b>Bio:</b> {{ profile.bio }}
              </p>
              <ul class="text-center">
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
            <div class="row bg-dark text-light m-2">
              <b>{{ profile.name }}, these are your friends!</b>
              <div class="d-flex">
                <!-- <button class="btn btn-secondary " @click="peopleOffset -=6" v-if="peopleOffset > 0" title="Previous Page">
                  <i class="mdi mdi-chevron-left f-20"></i>
                </button> -->
                <Following v-for="f in following" :key="f.id" :following="f" class="m-2 shadow" />
                <!-- <button class="btn btn-secondary " @click="peopleOffset +=6" v-if="peopleOffset != peopleOffset" title="Next Page">
                  <i class="mdi f-20 "></i> <i class="mdi mdi-chevron-right f-20 ">
                  </i>
                </button> -->
              </div>
            </div>

            <div class="row">
              <div class="col-12 d-flex justify-content-end">
                <i class="mdi mdi-cog f-20 text-light" type="button" data-bs-toggle="modal" data-bs-target="#profile-form">
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="row my-4">
          <div class="col-12">
            <h1 class="text-center fw-bold">
              Game Library
            </h1>
            <div class="card library-card bg-dark text-light py-5 text-center">
              <div class="d-flex">
                <button class="btn btn-dark shadow" @click="gamesOffset -=5" v-if="gamesOffset > 0" title="Previous Page">
                  <i class="mdi mdi-chevron-left f-20 "></i>
                </button>
                <FollowedGame v-for="f in followedGames" :key="f.id" :followed-game="f" class="mx-3" />
                <button class="btn btn-dark shadow" @click="gamesOffset +=5" v-if="gamesOffset <= 4" title="Next Page">
                  <i class="mdi f-20 "></i> <i class="mdi mdi-chevron-right f-20 ">
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row my-4">
          <div class="bg-dark rounded uploadss text-light py-5">
            <h2>POSTS</h2>
            <div class="d-flex mx-4" v-if="posts">
              <button class="btn btn-dark shadow" @click="postsOffset -=5" v-if="postsOffset > 0" title="Previous Page">
                <i class="mdi mdi-chevron-left f-20 "></i>
              </button>
              <Post v-for="p in posts" :key="p.id" :post="p" class="m-2 p-2" />
              <button class="btn btn-dark shadow" @click="postsOffset +=5" v-if="postsOffset != postsOffset" title="Next Page">
                <i class="mdi f-20 "></i> <i class="mdi mdi-chevron-right f-20 ">
                </i>
              </button>
            </div>
            <div class="card shadow text-center text-light" v-else>
              <h4>This user has no posts</h4>
            </div>
            <button v-if="user.isAuthenticated" class="btn btn-info my-2" type="button" data-bs-toggle="modal" data-bs-target="#post-form">
              Create Post
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
    const gamesOffset = ref(0)
    const postsOffset = ref(0)
    const peopleOffset = ref(0)
    watchEffect(async() => {
      if (route.params.otheruserId) {
        try {
          await postsService.getPostByProfileId(route.params.profileId)
        } catch (error) {
          Pop.toast(error, 'Error getting Posts')
        }
        try {
          await accountService.getTrackedGames(AppState.profile.id)
          await trackedGamesService.getTrackedGames()
        } catch (error) {
          Pop.toast(error, 'error')
        }
        try {
          await followService.getFollowing(AppState.profile.id)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    })
    return {
      gamesOffset,
      postsOffset,
      peopleOffset,
      profile: computed(() => AppState.profile),
      user: computed(() => AppState.user),
      posts: computed(() => AppState.usersPosts.slice(postsOffset.value, postsOffset.value + 5)),
      followedGames: computed(() => AppState.followedGames.slice(gamesOffset.value, gamesOffset.value + 5)),
      userPosts: computed(() => AppState.userPosts),
      post: computed(() => AppState.post),
      trackedGames: computed(() => AppState.trackedGames),

      following: computed(() => AppState.following.slice(peopleOffset.value, peopleOffset.value + 5)),

      canvasTest,
      testCanvas() {
        const canvas = document.getElementById('canvas-test')
        const imageUrl = canvas.toDataURL('image/jpeg')
        const videoElm = document.getElementById('test')
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
</style>
