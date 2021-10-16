<template>
  <div class="m-3">
    <router-link :to="{ name: 'OtherUserPage', params: { otheruserId: following.following.id} }">
      <img :src="following.following.picture" alt="" height="75" :title="following.following.name">
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    following: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
