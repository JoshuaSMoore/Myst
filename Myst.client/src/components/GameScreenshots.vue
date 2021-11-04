<template>
  <div class="mx-2 screenshot">
    <img :src="screenShot.image"
         width="300"
         alt=""
         class="selectable roundedNew"
         data-bs-toggle="modal"
         :data-bs-target="`#i-modal-` +screenShot.id"
    >
  </div>

  <Modal :id="`i-modal-`+ screenShot.id" class="bg-dark text-light">
    <template #modal-title>
    </template>
    <template #modal-body>
      <img :src="screenShot.image" alt="" class="" width="1000">
    </template>
  </Modal>
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
.screenshot{
  display:flex;
  align-items:center;
}
.roundedNew{
  border-radius:15px;
}
</style>
