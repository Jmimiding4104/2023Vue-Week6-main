<template>
    <h2>前台購物車</h2>
    <VueLoading :active="isLoading" />
    <div class="row">
      <div class="col-6 mx-auto">
        <table class="table align-middle mb-5">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">品名</th>
              <th scope="col">數量</th>
              <th scope="col">單價</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="carts?.carts?.length">
              <tr v-for="cart in carts.carts" :key="cart.id">
                <th scope="row">
                  <button type="button" class="btn btn-outline-danger" @click="removeCartItem(cart.id)">
                    <div v-if="loadingStatus.loadingItem === cart.id" class="spinner-border spinner-border-sm" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    移除購物車
                  </button>
                </th>
                <td>{{ cart.product.title }}</td>
                <td>{{ cart.qty }} / {{ cart.product.unit }}</td>
                <td class="text-end">{{ cart.final_total }}</td>
              </tr>
            </template>
            <tr v-else class="text-center">
              <td colspan="4">
                <p class="my-3">購物車還沒有任何商品</p>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colspan="3" class="text-end">總價</th>
              <td class="text-end">{{ carts.final_total }}</td>
            </tr>
          </tfoot>
        </table>
        <h2 class="mb-3">收件資訊</h2>
        <VForm
          ref="form"
          v-slot="{ errors }"
          class="text-start"
          @submit="createOrder"
          >
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <VField
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入信箱"
            rules="email|required"
            v-model="form.user.email"
            />
            <ErrorMessage name="email" class="invalid-feedback"/>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <VField
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="form.user.name"
            />
            <ErrorMessage name="姓名" class="invalid-feedback"/>
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <VField
            id="tel"
            name="電話"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            rules="required"
            v-model="form.user.tel"
            />
            <ErrorMessage name="電話" class="invalid-feedback"/>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <VField
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="form.user.address"
            />
            <ErrorMessage name="地址" class="invalid-feedback"/>
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <VField
            as="textarea"
            id="message"
            name="message"
            type="text"
            class="form-control"
            placeholder="請輸入留言"
            rows="10"
            v-model="form.message"
            />
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-primary">送出訂單</button>
          </div>
        </VForm>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      carts: {},
      isLoading: false,
      loadingStatus: {
        loadingItem: ''
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    // 取得購物車
    getCart () {
      this.isLoading = true
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${import.meta.env.VITE_APP_API_NAME}/cart`
      this.$http.get(url)
        .then(res => {
          this.carts = res.data.data
        })
        .catch(err => {
          alert(err.response.data.message)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    // 移除購物車單一品項
    removeCartItem (id) {
      this.loadingStatus.loadingItem = id
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${import.meta.env.VITE_APP_API_NAME}/cart/${id}`

      this.$http.delete(url)
        .then(res => {
          this.getCart()
        })
        .catch(err => {
          alert(err.response.data.message)
        })
        .finally(() => {
          this.loadingStatus.loadingItem = ''
        })
    },
    // 送出訂單
    createOrder () {
      if (!this.carts.carts.length) {
        alert('購物車為空，無法送出訂單')
        return
      }

      this.isLoading = true
      const url = `${import.meta.env.VITE_APP_API_URL}/api/${import.meta.env.VITE_APP_API_NAME}/order`
      const data = this.form

      this.$http.post(url, { data })
        .then(res => {
          alert(res.data.message)
          this.$refs.form.resetForm()
          this.getCart()
        })
        .catch(err => {
          alert(err.response.data.message)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
