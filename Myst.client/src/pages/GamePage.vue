<template>
  <div class="container-fluid pt-5 text-center">
    <div class="row">
      <h1>
        Current Game Title
      </h1>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-4 me-2 card">
        Game Image
      </div>
      <div class="col-6 ms-2 card">
        game description
      </div>
    </div>
    <div class="row pt-4">
      <div class="col-1"></div>
      <div class="col-5 me-2 p-5 card">
        related games
      </div>
      <div class="col-5 ms-2 p-5 card">
        trailer/pictures
      </div>
    </div>
  </div>
  <div class="row">
    <GameCard />
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
