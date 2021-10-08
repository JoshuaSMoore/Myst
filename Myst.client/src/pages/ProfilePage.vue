<template>
  <div class="row m-5">
    <h3> Profile Page</h3>
    <h4>{{ profile.picture }}</h4>
    <h4>{{ profile.name }}</h4>
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

</style>
