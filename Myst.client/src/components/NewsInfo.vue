<template>
  <div class="">
    <!-- <img :src="news.main_image" alt=""> -->
    <p>{{ news }} </p>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { News } from '../models/NewsCard'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
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
