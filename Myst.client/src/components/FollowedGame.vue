<template>
  <div>
    <router-link :to="{ name: 'Game', params: { gameId: followedGame.id }}">
      <h5 class="text-light">
        {{ followedGame.name }}
      </h5>
      <img :src="followedGame.background_image" width="200" alt="">
    </router-link>
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
