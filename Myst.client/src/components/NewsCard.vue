<template>
  <div class="card bg-dark text-light p-2 shadow-lg" style="width: 18rem;">
    <img :src="news.thumbnail" class="card-img-top selectable" data-bs-toggle="modal" :data-bs-target="'#a-modal-'+ news.id" alt="...">
    <div class="card-body">
      <h5 class="card-title">
        {{ news.title }}
      </h5>
      <p class="card-text">
        {{ news.short_description }}
      </p>
      <a :href="news.article_url" class="btn btn-primary">Read More</a>
    </div>
  </div>

  <Modal :id="'a-modal-'+news.id" class="bg-dark text-light">
    <template #modal-title>
      {{ news.title }}
    </template>
    <template #modal-body>
      <NewsInfo :article="news" class="m-5" />
    </template>
  </Modal>
</template>

<script>
export default {
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      setActive() {

      }
    }
  }
}
</script>

<style lang="css" scoped>

</style>
