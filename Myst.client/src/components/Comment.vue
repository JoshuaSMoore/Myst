<template>
  <h2> THIS IS A TEST COMMENT</h2>
  {{ comments.body }}
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      comments: computed(() => AppState.comments)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
