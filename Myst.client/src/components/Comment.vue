<template>
  <div class="bg-dark text-light" v-if="comments">
    <p>
      <img :src="comments.creator.picture" class="rounded-circle" height="45" :title="comments.creator.name">
      <i class="mdi mdi-delete-forever selectable text-light f-20 mx-3" title="Delete Comment" v-if="comments.creatorId === account.id" @click="deleteComment()"></i>
      {{ comments.body }}
    </p>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import Pop from '../utils/Pop'
import { useRoute } from 'vue-router'
export default {
  props: {
    comments: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      async deleteComment() {
        try {
          const res = await commentsService.deleteComment(route.params.postId, props.comments.id)
          return res
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
