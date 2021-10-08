<template>
  <div class="row m-5">
    <div class="col-12 d-flex justify-content-center">
      <div class="profile-card card bg-dark text-light">
        <h3>
          Profile Page <i class="mdi mdi-cog mdi-24px text-white elevation-5 " type="button" data-bs-toggle="modal" data-bs-target="#profile-form">
          </i>
        </h3>

        <img class="rounded" :src="profile.picture" alt="" height="100" width="100" />
        <h4>{{ profile.name }}</h4>
        <p v-if="profile.bio">
          <b>Bio:</b> {{ profile.bio }}
        </p>
        <p v-if="profile.twitch">
          <b class="mdi mdi-twitch  mdi-24px"></b> {{ profile.twitch }}
        </p>
        <p v-if="profile.github">
          <b class="mdi mdi-github mdi-24px"></b> {{ profile.github }}
        </p>
        <p v-if="profile.steam">
          <b class="mdi mdi-steam mdi-24px"></b> {{ profile.steam }}
        </p>
        <p v-if="profile.xbox">
          <b class="mdi mdi-microsoft-xbox mdi-24px"></b> {{ profile.xbox }}
        </p>
        <p v-if="profile.playstation">
          <b class="mdi mdi-sony-playstation mdi-24px"></b> {{ profile.playstation }}
        </p>

        <p v-if="profile.nintendo">
          <b class="mdi mdi-nintendo-switch mdi-24px"></b> {{ profile.nintendo }}
        </p>
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
//   width: 70rem;
//   height: 30rem;
// }
</style>
