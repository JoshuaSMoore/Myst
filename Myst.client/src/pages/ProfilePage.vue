<template>
  <div class="row m-5">
    <div class="col-12 d-flex justify-content-center">
      <div class="profile-card card bg-dark text-light">
        <h3> Profile Page</h3>
        <img class="rounded" :src="profile.picture" alt="" height="65" width="65" />
        <h4>{{ profile.name }}</h4>
      </div>
    </div>
  </div>
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
