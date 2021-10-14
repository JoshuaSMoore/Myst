<template>
  <div class="container" v-if="profile">
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
            <div class="col-md-8">
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
              <div class="card friend-card bg-light text-dark mx-5 text-center">
                <b>Friends here</b>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 d-flex justify-content-end">
              <i class="mdi mdi-plus f-20 text-light" type="button" @click="addFollower()">
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
              <FollowedGame v-for="f in followedGames" :key="f.id" :followed-game="f" class="mx-3" />
            </div>
          </div>
        </div>
      </div>
      <div class="row my-4">
        <div class="bg-dark rounded uploadss text-light py-5">
          <h2>POSTS</h2>
          <div class="d-flex mx-4" v-if="posts">
            <Post v-for="p in posts" :key="p.id" :post="p" class="m-2" />
          </div>
          <div class="card shadow text-center text-light" v-else>
            <h4>This user has no posts</h4>
          </div>
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
import { computed, onMounted } from '@vue/runtime-core'
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
    const route = useRoute()
    onMounted(async() => {
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
        await accountService.getTrackedGames(route.params.otheruserId)
        await trackedGamesService.getTrackedGames()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      profile: computed(() => AppState.otherUser),
      user: computed(() => AppState.user),
      posts: computed(() => AppState.usersPosts),
      followedGames: computed(() => AppState.followedGames),
      async addFollower() {
        try {
          await followService.addFollower(route.params.otheruserId)
          Pop.toast("You've followed this Gamer", 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.live-card{
  height: 15rem;
}

.friend-card{
  height: 7rem;
}

.library-card{
  height: 20rem;
  overflow-x: scroll;
  overflow-y: hidden;
}
.uploadss{
  overflow-x: scroll;
  overflow-y: hidden;
}
</style>
