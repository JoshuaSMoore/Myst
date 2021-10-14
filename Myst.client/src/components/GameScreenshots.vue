<template>
  <div>
    <img :src="screenShot.image" width="200" alt="">
  </div>
</template>

<script>

export default {
  props: {
    screenShot: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
