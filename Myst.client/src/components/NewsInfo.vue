<template>
  <div class="bg-dark text-light">
    <div class="form-group header">
      {{ article.title }}
    </div>
    <div v-html="htmlFix(article.article_content)">
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { News } from '../models/NewsCard'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      news: computed(() => AppState.news),
      htmlFix(content) {
        const dotcomIndex = props.article.article_url.indexOf('.com/') + 5
        // eslint-disable-next-line prefer-regex-literals
        const regx = new RegExp('src="../', 'g')
        const uri = props.article.article_url.slice(0, dotcomIndex)
        const fixed = content.replace(regx, `loading="lazy" src="${uri}`)
        return fixed
      }

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
