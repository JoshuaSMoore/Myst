<template>
  <div class="card bg-dark m-2 " style="width: 25rem;">
    <router-link :to="{ name: 'OtherUserPage', params: {otheruserId: account.id}}">
      <img :src="account.picture" class="card-img-top rounded w-100" alt="...">
      <div class="card-body">
        <h5 class="card-title">
          {{ account.name }}
        </h5>
        <p class="card-text">
          {{ account.email }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    account: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
