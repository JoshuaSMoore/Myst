<template>
  <div class="post-form">
    <form @submit.prevent="createPost()">
      <div class="form-group">
        <label for="body">Title</label>
        <input type="text"
               class="form-control bg-light"
               name="body"
               placeholder="Title...."
               v-model="editable.body"
               required
        >
      </div>
      <div class="form-group">
        <label for="img">Img Url</label>
        <input type="text"
               class="form-control bg-light"
               name="img"
               placeholder="Img Url...."
               v-model="editable.img"
               required
        >
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-success mt-2">
          Create Post
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
import { postsService } from '../services/PostsService'
export default {
  setup() {
    const editable = ref({ posts: [] })
    return {
      editable,
      async createPost() {
        try {
          await postsService.createPost(editable.value)
          editable.value = { posts: [] }
          Pop.toast(' Post Created', 'success')
          const modal = Modal.getInstance(document.getElementById('post-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
