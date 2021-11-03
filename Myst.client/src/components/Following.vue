<template>
  <div class="m-3 glow rounded">
    <router-link :to="{ name: 'OtherUserPage', params: { otheruserId: following.following.id} }">
      <img :src="following.following.picture" class="rounded" height="75" :title="following.following.name">
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
.glow {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.548);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.glow:hover {
  box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.829);
}
</style>
