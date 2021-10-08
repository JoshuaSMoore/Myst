<template>
  <div class="card bg-primary">
    <div class="card-header">
      {{ news.title }}
    </div>
    <div class="card-body">
      <h5 class="card-title">
        Placeholder
      </h5>
      <p class="card-text">
        {{ news.shortDescription }}
      </p>
      <a :href="news.url" class="btn btn-primary">Read More</a>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {

  setup() {
    return {
      news: computed(() => AppState.news)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
