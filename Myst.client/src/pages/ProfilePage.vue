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
            <div class="col-md-4 m-auto">
              <div class=" bg-dark text-light d-flex justify-content-center align-items-center">
                <iframe
                  :src="`https://player.twitch.tv/?channel=${profile.twitch}&parent=localhost`"
                  width="500px"
                  height="300px"
                >
                </iframe>
              </div>
            </div>
            <div id="test-elm" class="col-md-8">
              <div class="d-flex m-4">
                <div>
                  <img class="rounded" :src="profile.picture" alt="" height="200" width="200" />
                </div>
                <div class="mx-4">
                  <p v-if="profile.bio" class="my-1">
                    <b>Bio:</b> {{ profile.bio }}
                  </p>
                  <p v-if="profile.twitch" class="my-1">
                    <b class="mdi mdi-twitch  mdi-24px"></b> {{ profile.twitch }}
                  </p>
                  <p v-if="profile.github" class="my-1">
                    <b class="mdi mdi-github mdi-24px"></b> {{ profile.github }}
                  </p>
                  <p v-if="profile.steam" class="my-1">
                    <b class="mdi mdi-steam mdi-24px"></b> {{ profile.steam }}
                  </p>
                  <p v-if="profile.xbox" class="my-1">
                    <b class="mdi mdi-microsoft-xbox mdi-24px"></b> {{ profile.xbox }}
                  </p>
                  <p v-if="profile.playstation" class="my-1">
                    <b class="mdi mdi-sony-playstation mdi-24px"></b> {{ profile.playstation }}
                  </p>
                  <p v-if="profile.nintendo" class="my-1">
                    <b class="mdi mdi-nintendo-switch mdi-24px"></b> {{ profile.nintendo }}
                  </p>
                </div>
              </div>
              <div class="bg-secondary text-light  mx-5 text-center rounded">
                <b>Who you are following</b>
                <div class="d-flex">
                  <button class="btn btn-secondary " @click="peopleOffset -=6" v-if="peopleOffset > 0" title="Previous Page">
                    <i class="mdi mdi-chevron-left f-20"></i>
                  </button>
                  <Following v-for="f in following" :key="f.id" :following="f" class="m-2 shadow" />
                  <button class="btn btn-secondary " @click="peopleOffset +=6" v-if="peopleOffset <= 6" title="Next Page">
                    <i class="mdi f-20 "></i> <i class="mdi mdi-chevron-right f-20 ">
                    </i>
                  </button>
                </div>
              </div>
            </div>
            <!-- CANVAS ENDS HERE -->
            <canvas class="canvas" id="canvas-test">
            </canvas>
            <button class="btn btn-outline-light" @click="testCanvas">
              test canvas
            </button>
            <img :src="canvasTest" alt="nothing">
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
              <button class="btn btn-dark shadow" @click="gamesOffset +=5" v-if="gamesOffset <= 6" title="Next Page">
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
            <button class="btn btn-dark shadow" @click="postsOffset +=5" v-if="postsOffset < 5" title="Next Page">
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
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
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
    onMounted(async() => {
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

/* .profile-card{
  width: 90rem;
  height: 30rem;
} */

.live-card{
  height: 15rem;
}

/* .friend-card{
  height: 9rem;
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
    scrollbar-color: black;
  scrollbar-track-color: black;
  scrollbar-3dlight-color: blanchedalmond;
  scrollbar-arrow-color: aquamarine;
}
.friend-card ::-webkit-scrollbar {
  display: none;
} */
/* .library-card{
  height: 20rem;
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
    scrollbar-color: black;
  scrollbar-track-color: black;
  scrollbar-3dlight-color: blanchedalmond;
  scrollbar-arrow-color: aquamarine;
}
.library-card ::-webkit-scrollbar {
  display: none;
} */
/* .uploadss{
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scrollbar-color: black;
  scrollbar-track-color: black;
  scrollbar-3dlight-color: blanchedalmond;
  scrollbar-arrow-color: aquamarine;
}
.uploadss ::-webkit-scrollbar {
  display: none;
} */
</style>
