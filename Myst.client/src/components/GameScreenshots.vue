<template>
  <div class="component">
    <p>{{ platform.platform.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    screenshots: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
