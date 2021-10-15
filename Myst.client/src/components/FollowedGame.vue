<template>
  <!-- <div class="">
    <router-link :to="{ name: 'Game', params: { gameId: followedGame.id }}">
      <h5 class="text-light">
        {{ followedGame.name }}
      </h5>
      <img :src="followedGame.background_image" width="200" alt="">
    </router-link>
  </div> -->

  <div class="col">
    <div class="card h-100 bg-dark text-light">
      <router-link :to="{ name: 'Game', params: { gameId: followedGame.id }}">
        <img :src="followedGame.background_image" class="card-img-top" alt="...">
        <div class="card-body bg-dark text-light">
          <h5 class="card-title">
            {{ followedGame.name }}
          </h5>
        </div>
      </router-link>
    </div>
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
