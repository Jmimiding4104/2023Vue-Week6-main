<template>
<div class="modal fade" ref="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-6">
            <img :src="product.imageUrl" :alt="product.title">
          </div>
          <div class="col-6 text-start">
            <div class="d-flex gap-2 mb-3 align-items-center">
              <h1 class="modal-title fs-5" id="exampleModalLabel">{{ product.title }}</h1>
              <span class="badge rounded-pill text-bg-primary">{{ product.category}}</span>
            </div>
              <p>商品描述：</p>
              <p>{{ product.description ? product.description : '暫無' }}</p>
              <p>商品內容：</p>
              <p>{{ product.content ? product.content : '暫無' }}</p>
              <div class="input-group">
                <input type="number" class="form-control" min="1" v-model="qty">
                <button class="btn btn-primary" type="button" id="button-addon2" @click="$emit('add-to-cart', product.id, qty)">
                  <div v-if="loadingStatus.loadingItemAddCart === product.id" class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  加入購物車
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['product', 'loadingStatus'],
  data () {
    return {
      modal: '',
      qty: 1
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    closeModal () {
      this.modal.hide()
    }
  },
  watch: {
    product () {
      this.qty = 1
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
  }
}
</script>
