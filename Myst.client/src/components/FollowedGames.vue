<template>
  <div class="text-light">
    {{ followedGame.name }}
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
