<template>
  <div class="row m-5">
    <div class="col-12 d-flex justify-content-center">
      <div class="profile-card card bg-dark text-light">
        <h3> Profile Page</h3>     <i class="mdi mdi-cog mdi-48px text-white elevation-5 " type="button" data-bs-toggle="modal" data-bs-target="#profile-form">
        </i>

        <img class="rounded" :src="profile.picture" alt="" height="65" width="65" />
        <h4>{{ profile.name }}</h4>
        <p><b>Bio:</b> {{ profile.bio }}</p>
        <p><b>Twitch:</b> {{ profile.twitch }}</p>
        <p><b>Github:</b> {{ profile.github }}</p>
        <p><b>Steam: </b> {{ profile.steam }}</p>
        <p><b>Xbox:</b> {{ profile.xbox }}</p>
        <p><b>playstation:</b> {{ profile.playstation }} </p>

        <p><b>nintendo:</b> {{ profile.nintendo }}</p>
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
.profile-card{
  width: 70rem;
  height: 30rem;
}
</style>
