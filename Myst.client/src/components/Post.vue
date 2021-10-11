<template>
  <div class="post">
    <div class="row">
      <div class="card">
        <div class="card-body">
          tester img
          <img :src="posts.img" width="35" class="ms-3" alt="">
        </div>
        <div class="card-footer">
          tester body spot
          {{ post.body }}
          {{ post.title }}
          <i class="mdi mdi-delete-forever selectable text-danger f-20 mx-3" title="Delete Post" v-if="post.creatorId === account.id" @click="deletePost(post.id)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { Post } from '../models/Post'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'

export default {
  props: {
    post: { type: Post, required: true }
  },
  setup(props) {
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      async deletePost(postId) {
        const yes = await Pop.confirm('Do you want to delete this?')
        if (!yes) { Pop.toast('delete canceled', 'success') } else {
          try {
            await postsService.deleteNote(postId)
          } catch (error) {
            Pop.toast(error.message, 'error')
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
