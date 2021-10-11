<template>
  <div class="container-fluid">
    <div class="row my-5">
      <div class="col-12">
        <h2>Welcome, {{ profile.name }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <div class="profile-card container card bg-dark text-light">
          <div class="row">
            <div class="col-md-4 m-auto">
              <div class="card live-card bg-light text-dark d-flex justify-content-center align-items-center">
                <b>LIVE STREAM COMING SOON</b>
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
              <div class="card friend-card bg-light text-dark mx-5">
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
  </div>
  <Modal id="profile-form">
    <template #modal-title>
      <h4>Update Profile</h4>
    </template>
    <template #modal-body>
      <ProfileForm />
    </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
export default {
  setup() {
    return {
      profile: computed(() => AppState.profile)
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
  height: 5rem;
}
</style>
