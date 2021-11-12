<template>
  <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl ">
      <div class="modal-content">
        <div class="modal-header text-light bg-dark">
          <h5 class="modal-title" id="exampleModalLabel">
            <slot name="modal-title"></slot>
          </h5>
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Close">
            <i class="mdi mdi-close text-light" title="Close"></i>
          </button>
        </div>
        <div class="modal-body bg-dark text-light">
          <slot name="modal-body"></slot>
        </div>
        <div class="modal-footer bg-dark text-light">
          <img src="../assets/img/mystlight.png" alt="MYST LOGO">
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
