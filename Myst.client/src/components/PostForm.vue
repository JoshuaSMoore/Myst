<template>
  <div class="post-form">
    <form @submit.prevent="createPost">
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
        <input type="file" ref="fileInput" accept="image/*,video/*" @change="filePicked" multiple="multiple">
      </div>
      <div class="col">
        <img src="" alt="" class="img-fluid" id="image">
        <video class="img-fluid" src="" id="video"></video>
      </div>
      <div class="form-group">
        <button v-if="files[0] && editable.body" class="btn btn-primary text-light me-5" type="button" @click="upload">
          Create Post
        </button>
        <div class="spinner-border text-light ms-5" role="status" v-if="files[0] && editable.body">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
import { postsService } from '../services/PostsService'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { firebaseService } from '../services/FirebaseService'
export default {
  data() {
    return {
      value: 33.333,
      max: 50
    }
  },
  setup() {
    const editable = ref({ posts: [] })
    const files = ref([])
    return {
      editable,
      files,
      post: computed(() => AppState.posts),
      async createPost() {
        try {
          await postsService.createPost(editable.value)
          this.print()
          editable.value = { posts: [] }
          files.value = []
          document.getElementById('image').src = ''
          document.getElementById('video').src = ''
          Pop.toast(' Post Created', 'success')
          const modal = Modal.getInstance(document.getElementById('post-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      filePicked(event) {
        files.value = event.target.files
        logger.log('files ref value', files.value)
        const reader = new FileReader()
        reader.readAsDataURL(files.value[0])
        reader.onload = () => {
          document.getElementById('image').src = reader.result
          document.getElementById('video').src = reader.result
        }
        files.value[0]?.type.includes('image') ? editable.value.type = 'Images' : editable.value.type = 'Videos'
      },
      async upload() {
        const url = await firebaseService.upload(files.value[0], editable.value.type)
        editable.value.mediaUrl = url
        logger.log(url)
        await this.createPost()
      },
      print() {
        AppState.printing = true
        setTimeout(function() {
          AppState.printing = false
        }, 2000)
      }
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
