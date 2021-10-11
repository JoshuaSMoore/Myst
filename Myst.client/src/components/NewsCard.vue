<template>
  <div class="card bg-dark text-light p-2" style="width: 18rem;">
    <img :src="news.thumbnail" class="card-img-top selectable" data-bs-toggle="modal" data-bs-target="#a-modal" alt="...">
    <div class="card-body">
      <h5 class="card-title">
        {{ news.title }}
      </h5>
      <p class="card-text">
        {{ news.short_description }}
      </p>
      <a :href="news.article_url" class="btn btn-primary">Read More</a>
    </div>
  </div>

  <Modal id="a-modal">
    <template #modal-title>
      Content
    </template>
    <template #modal-body>
      <NewsInfo />
    </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { News } from '../models/NewsCard'
export default {
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {

    }
  }
}
</script>

<style lang="css" scoped>

</style>
