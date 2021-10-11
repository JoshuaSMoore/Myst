<template>
  <div class="">
    <img :src="article.main_image" class="card-img-top selectable">
    {{ article.title }}<p />
    <div v-html="article.article_content">
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { News } from '../models/NewsCard'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      news: computed(() => AppState.news)

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
