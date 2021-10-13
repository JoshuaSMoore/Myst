<template>
  <div class="bg-dark text-light">
    <div class="form-group header">
      div class="card-body container-fluid">
      <img :src="info.mediaUrl"
           v-if="info.mediaUrl?.includes('Image')"
           width="300"
           class="img-fluid selectable"
           alt=""
      >
      <video class="img-fluid" controls v-else>
        <source :src="info.mediaUrl" type="video/mp4" />
        <source src="movie.ogg" type="video/ogg" />
      </video>
    </div>
  </div>
  <div class="bg-secondary text-dark mt-2">
    <h3>COMMENTS GO HERE</h3>
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
    info: {
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
