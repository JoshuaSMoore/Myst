<template>
  <div class="bg-dark text-light">
    <div class="form-group header">
      <div class="card-body container-fluid">
        <img :src="info.mediaUrl"
             v-if="info.mediaUrl?.includes('Image')"
             width="300"
             class="img-fluid selectable"
             alt=""
        >
        <video class="img-fluid" controls v-else preload="none">
          <source :src="info.mediaUrl" type="video/mp4" />
        </video>
      </div>
    </div>
    <div class="bg-dark text-light mt-2">
      <form @submit.prevent="createComment">
        <div class="input-group p-2">
          <input type="text"
                 required
                 class="form-control"
                 name="comment"
                 id="comment"
                 placeholder="SAY SOMETHING"
                 label="Add Comment"
                 v-model="editable.body"
          >
          <button class="btn btn-dark justify-self-end" type="submit" style="">
            <i class="mdi mdi-plus-circle selectable"></i>
          </button>
        </div>
      </form>
    </div>
    <div class="m-2">
      <Comment v-for="comment in comments"
               :key="comment.id"
               :comments="comment"
               class="p-2"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'

import { AppState } from '../AppState'

import { Post } from '../models/Post'
import { commentsService } from '../services/CommentsService'
import Pop from '../utils/Pop'

export { commentsService } from '../services/CommentsService'

export default {
  props: {
    info: {
      type: Post,
      default: () => new Post()
    }
  },
  setup(props) {
    const editable = ref({})
    return {
      editable,
      posts: computed(() => AppState.posts),
      userPosts: computed(() => AppState.userPosts),
      comments: computed(() => AppState.comments),
      async createComment() {
        try {
          // I NEED
          editable.value.postId = props.info.id
          await commentsService.createComment(editable.value.postId, editable.value)
          editable.value = { comments: [] }
          Pop.toast('Comment Added', 'success')
        } catch (error) {
          Pop.toast('error making comment', error.message)
        }
      }
    }
  }
}
</script>

<style lang="
             scss"
             scoped
    >
</style>
