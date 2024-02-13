<template>
    <h3>後台產品列表</h3>
    <VueLoading :active="isLoading" />
    <table class="table align-middle">
    <thead>
      <tr>
        <th scope="col">分類</th>
        <th scope="col">產品名稱</th>
        <th scope="col">原價</th>
        <th scope="col">售價</th>
        <th scope="col">是否啟用</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td class="text-end">{{ product.origin_price }}</td>
        <td class="text-end">{{ product.price }}</td>
        <td>
          <span v-if="product.is_enabled" class="text-success">已啟用</span>
          <span v-else class="text-danger">未啟用</span>
        </td>
      </tr>
    </tbody>
  </table>
  <PaginationComp :pagination="pagination" @update-page="getProducts" />
</template>

<script>
import PaginationComp from '../components/PaginationComp.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      isLoading: false
    }
  },
  components: {
    PaginationComp
  },
  methods: {
    getProducts (page) {
      this.isLoading = true
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${import.meta.env.VITE_APP_API_NAME}/admin/products?page=${page}`

      this.$http.get(url)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
