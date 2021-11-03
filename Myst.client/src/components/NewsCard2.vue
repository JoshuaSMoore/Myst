<template>
  <div class="card m-2 bg-dark text-light newsCard" style="max-width: 1000px;">
    <div class="row g-0">
      <div class="col-md-4 p-1">
        <img :src="news.thumbnail" class="img-fluid rounded-start selectable p-1  animate__animated animate__tada" data-bs-toggle="modal" :data-bs-target="'#a-modal-'+ news.id" alt="Picture">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            {{ news.title }}
          </h5>
          <p class="card-text">
            {{ news.short_description }}
          </p>
          <a data-bs-toggle="modal" :data-bs-target="'#a-modal-'+ news.id" class="btn btn-primary">Read More</a>
        </div>
      </div>
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
import 'animate.css'
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

<style lang="scss" scoped>
.newsCard {

  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

.newsCard:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

</style>
