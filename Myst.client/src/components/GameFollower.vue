<template>
  <div class="m-2">
    <router-link :to="{ name: 'OtherUserPage', params: { otheruserId: tracker.tracker.id }}">
      <img :src="tracker.tracker.picture" alt="" height="75">
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    tracker: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
