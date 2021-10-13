<template>
  <div class="post m-2">
    <div class="card bg-info text-light shadow" style="width: 18rem" v-if="post.body != 'loading'">
      <div class="card-body container-fluid">
        <img :src="post.mediaUrl"
             v-if="post.mediaUrl?.includes('Image')"
             width="300"
             class="img-fluid selectable"
             alt=""
        >
        <video class="img-fluid" controls v-else>
          <source :src="post.mediaUrl" type="video/mp4" />

        </video>
        <i class="mdi mdi-delete-forever selectable text-light f-20 mx-3" title="Delete Post" v-if="post.creatorId === account.id" @click="deletePost(post.id)"></i>
      </div>
      <div class="d-flex card-footer bg-primary text-dark selectable"
           data-bs-toggle="modal"
           :data-bs-target="'#p-modal-'+post.id"
      >
        <h5>{{ post.body }}</h5>
      </div>
    </div>
    <div class=" bg-info text-dark shadow text-light ms-5" role="status" v-else>
      <img src="../assets/img/transpine.png" class="spinner">
      <span class="visually-hidden text-light">Loading...</span>
    </div>
  </div>
  <Modal :id="'p-modal-'+post.id" class="bg-dark text-light">
    <template #modal-title>
      {{ post.body }}
    </template>
    <template #modal-body>
      <PostInfo :info="post" class="m-5" />
    </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { Post } from '../models/Post'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
import { firebaseService } from '../services/FirebaseService.js'

export default {
  props: {
    post: { type: Post, required: true }
  },
  setup(props) {
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      async deletePost(id) {
        const yes = await Pop.confirm('Do you want to delete this?')
        if (!yes) { Pop.toast('delete canceled', 'error') } else {
          try {
            await postsService.deletePost(id)
            await firebaseService.remove(props.post.mediaUrl)
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
