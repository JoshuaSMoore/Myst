<template>
  <form @submit.prevent="editProfile()" class="px-5 mx-5">
    <div class="form-group">
      <label for="title">UserName</label>
      <input type="text"
             class="form-control bg-light"
             name="name"
             placeholder="UserName"
             v-model="account.name"
      >
    </div>
    <div class="form-group">
      <label for="body">Profile Picture</label>
      <input type="text"
             class="form-control bg-light"
             name="title"
             placeholder="📸"
             v-model="account.picture"
      >
    </div>
    <div class="form-group">
      <label for="title">Bio</label>
      <input type="text"
             class="form-control bg-light"
             name="bio"
             placeholder="bio"
             v-model="account.bio"
      >
    </div>
    <div class="form-group">
      <label for="body">Twitch</label>
      <input type="text"
             class="form-control bg-light"
             name="twitch"
             placeholder="Twitch"
             v-model="account.twitch"
      >
    </div>
    <div class="form-group">
      <label for="body">Github</label>
      <input type="text"
             class="form-control bg-light"
             name="github"
             placeholder="Github"
             v-model="account.github"
      >
    </div>
    <div class="form-group">
      <label for="body">Steam</label>
      <input type="text"
             class="form-control bg-light"
             name="steam"
             placeholder="Steam"
             v-model="account.steam"
      >
    </div>
    <div class="form-group">
      <label for="body">Xbox</label>
      <input type="text"
             class="form-control bg-light"
             name="xbox"
             placeholder="Xbox"
             v-model="account.xbox"
      >
    </div>
    <div class="form-group">
      <label for="body">Playstation</label>
      <input type="text"
             class="form-control bg-light"
             name="playstation"
             placeholder="Playstation"
             v-model="account.playstation"
      >
    </div>
    <div class="form-group">
      <label for="body">Nintendo</label>
      <input type="text"
             class="form-control bg-light"
             name="nintendo"
             placeholder="Nintendo"
             v-model="account.nintendo"
      >

      <div class="form-group">
        <button type="submit" class="btn btn-success mt-2">
          Update
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
import { accountService } from '../services/AccountService.js'
import { logger } from '../utils/Logger.js'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'
export default {
  setup() {
    const editable = ref({})
    const account = computed(() => AppState.account)
    return {
      editable,
      account,
      async editProfile() {
        try {
          await accountService.editProfile(account.value)
          account.value = {}
          Pop.toast('Profile edited much yes', 'success')
          const modal = Modal.getInstance(document.getElementById('profile-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style>

</style>
