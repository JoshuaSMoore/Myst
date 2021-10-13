<template>
  <div class="bg-dark text-light">
    <div class="form-group header">
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { News } from '../models/NewsCard'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { Post } from '../models/Post'
export default {
  props: {
    post: {
      type: Post,
      required: true
    }
  },
  setup(props) {
    return {
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
