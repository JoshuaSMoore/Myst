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
          <div class="card library-card bg-dark text-light py-5 text-center">
            <h1>
              game library here
            </h1>
          </div>
        </div>
      </div>
      <div class="row my-4">
        <div class="col-12">
          <div class="card library-card bg-dark text-light py-5 text-center">
            <h1>
              Posts go here
            </h1>
            <button v-if="user.isAuthenticated" class="btn btn-info my-2" type="button" data-bs-toggle="modal" data-bs-target="#post-form">
              Create Post
            </button>
            <div class="row mx-4">
              <div class="card shadow" v-if="posts">
                <Post v-for="p in posts" :key="p.id" :post="p" />
              </div>
              <div class="card shadow" v-else>
                <h4>This user has no posts</h4>
              </div>
            </div>
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
import { AppState } from '../AppState.js'
import { postsService } from '../services/PostsService.js'
import Pop from '../utils/Pop.js'
import { accountService } from '../services/AccountService.js'

export default {
  setup() {
    onMounted(async() => {
      try {
        await postsService.getPostByProfileId()
      } catch (error) {
        Pop.toast(error, 'Error getting Posts')
      }
      try {
        await accountService.getTrackedGames(AppState.profile.id)
      } catch (error) {

      }
    })
    return {
      profile: computed(() => AppState.profile),
      user: computed(() => AppState.user),
      posts: computed(() => AppState.usersPosts)
    }
  }
}
</script>

<style lang="scss" scoped>
// .profile-card{
//   width: 90rem;
//   height: 30rem;
// }

.live-card{
  height: 15rem;
}

.friend-card{
  height: 7rem;
}

.library-card{
  height: 20rem
}
</style>
