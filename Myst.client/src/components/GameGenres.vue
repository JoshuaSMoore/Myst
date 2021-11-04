<template>
  <div class="me-2">
    <p> {{ genre.name }} </p>
  </div>
</template>

<script>
export default {
  props: {
    genre: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
