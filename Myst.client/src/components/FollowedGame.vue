<template>
  <div>
    <h5 class="text-light">
      {{ followedGame.name }}
    </h5>
    <img :src="followedGame.background_image" width="200" alt="">
  </div>
</template>

<script>
export default {
  props: {
    followedGame: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
