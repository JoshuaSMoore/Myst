<template>
  <div class="card p-0" style="width: 25rem;">
    <router-link :to="{ name: 'OtherUserPage', params: {otheruserId: account.id}}">
      <img :src="account.picture" class="card-img-top rounded" alt="...">
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
