<template>
  <div class="component">
    <!-- <img :src="news.main_image" alt=""> -->
    <!-- <p>{{ news.article_content }} </p> -->
  </div>
</template>

<script>
import { News } from '../models/NewsCard'
export default {
  props: {
    news: {
      type: News,
      required: true
    }
  },
  setup(props) {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
