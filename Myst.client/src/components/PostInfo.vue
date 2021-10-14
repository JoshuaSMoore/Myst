<template>
  <div class="bg-primary text-light">
    <div class="form-group header">
      <div class="card-body container-fluid">
        <img :src="info.mediaUrl"
             v-if="info.mediaUrl?.includes('Image')"
             width="300"
             class="img-fluid selectable"
             alt=""
        >
        <video class="img-fluid" controls v-else preload="none">
          <source :src="info.mediaUrl" type="video/mp4" preload="none" />
        </video>
      </div>
    </div>
    <div class="bg-secondary text-primary mt-2">
      <form onsubmit="">
        <div class="input-group p-2">
          <input type="text"
                 required
                 class="form-control"
                 name="comment"
                 id="comment"
                 placeholder="SAY SOMETHING"
                 label="Add Comment"
          >
          <button class="btn btn-dark justify-self-end" type="submit" style="">
            <i class="mdi mdi-plus-circle selectable"></i>
          </button>
        </div>
      </form>
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
