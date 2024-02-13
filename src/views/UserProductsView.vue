<template>
  <h2>前台產品列表</h2>
  <VueLoading :active="isLoading" />
  <table class="table align-middle">
    <thead>
      <tr>
        <th scope="col">圖片</th>
        <th scope="col">商品名稱</th>
        <th scope="col">價格</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td scope="row" style="width: 25%;">
          <img :src="product.imageUrl" :alt="product.title" style="width: 200px;">
        </td>
        <td style="width: 10%;">{{ product.title }}</td>
        <td style="width: 40%;">
          <template v-if="product.origin_price !== product.price">
            <del>原價 {{ product.origin_price }} 元</del>
            <h5>現在只要 {{ product.price }} 元</h5>
          </template>
          <h5 v-else>{{ product.price }} 元</h5>
        </td>
        <td style="width: 25%;">
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-secondary" @click="getProduct(product.id)" :disabled="loadingStatus.loadingItem === product.id">
              <div v-if="loadingStatus.loadingItemMore === product.id" class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              查看更多
            </button>
            <button type="button" class="btn btn-primary" @click="addToCart(product.id)" :disabled="loadingStatus.loadingItem === product.id">
              <div v-if="loadingStatus.loadingItemAddCart === product.id" class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            加入購物車</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <PaginationComp :pagination="pagination" @update-page="getProducts"></PaginationComp>
  <UserProductModal ref="userProductModal" :product="product" :loadingStatus="loadingStatus" @add-to-cart="addToCart"></UserProductModal>
</template>

<script>
import UserProductModal from '../components/UserProductModal.vue'
import PaginationComp from '../components/PaginationComp.vue'

export default {
  data () {
    return {
      products: [],
      product: {},
      pagination: {},
      isLoading: false,
      loadingStatus: {
        loadingItem: '',
        loadingItemMore: '',
        loadingItemAddCart: ''
      }
    }
  },
  components: {
    UserProductModal,
    PaginationComp
  },
  methods: {
    // 取得產品列表
    getProducts (page = 1) {
      this.isLoading = true
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${import.meta.env.VITE_APP_API_NAME}/products/?page=${page}`

      this.$http.get(url)
        .then(res => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch(err => {
          alert(err.response.data.message)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    // 取得單一產品
    getProduct (id) {
      this.loadingStatus.loadingItem = id
      this.loadingStatus.loadingItemMore = id

      const url = `${import.meta.env.VITE_APP_API_URL}/api/${import.meta.env.VITE_APP_API_NAME}/product/${id}`

      this.$http.get(url)
        .then(res => {
          this.product = res.data.product
          this.$refs.userProductModal.openModal()
        })
        .catch(err => {
          alert(err.response.data.message)
        })
        .finally(() => {
          this.loadingStatus.loadingItem = ''
          this.loadingStatus.loadingItemMore = ''
        })
    },
    // 加入購物車
    addToCart (id, qty = 1) {
      this.loadingStatus.loadingItem = id
      this.loadingStatus.loadingItemAddCart = id

      const url = `${import.meta.env.VITE_APP_API_URL}/api/${import.meta.env.VITE_APP_API_NAME}/cart`
      const data = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data })
        .then(res => {
          alert(res.data.message)
          this.$refs.userProductModal.closeModal()
        })
        .catch(err => {
          alert(err.response.data.message)
        })
        .finally(() => {
          this.loadingStatus.loadingItem = ''
          this.loadingStatus.loadingItemAddCart = ''
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
