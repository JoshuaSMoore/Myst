<template>
  <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md ">
      <div class="modal-content">
        <div class="modal-header text-light bg-dark">
          <h5 class="modal-title" id="exampleModalLabel">
            <slot name="modal-title"></slot>
          </h5>
          <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body bg-dark text-light">
          <slot name="modal-body"></slot>
        </div>
        <div class="modal-footer bg-dark text-light">
          <img src="../assets/img/myst-logo.png" alt="MYST LOGO">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>
