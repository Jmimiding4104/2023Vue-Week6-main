<template>
  <h1 class="mb-3">這是後台頁面</h1>
  <div class="mb-3">
    <RouterLink to="/">回前台</RouterLink> |
    <RouterLink to="/admin/products">後台產品列表</RouterLink> |
    <RouterLink to="/admin/orders">後台訂單</RouterLink> |
    <a href="#" @click.prevent="signout">登出</a>
  </div>

  <RouterView v-if="checkSuccess" />
  <VueLoading :active="isLoading" />
</template>

<script>
export default {
  data () {
    return {
      checkSuccess: false,
      isLoading: false
    }
  },
  methods: {
    checkLogin () {
      this.isLoading = true
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)W6Token\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      if (token) {
        this.$http.defaults.headers.common.Authorization = token
        const url = `${import.meta.env.VITE_APP_API_URL}/api/user/check`
        this.$http.post(url)
          .then(res => {
            this.checkSuccess = true
          })
          .catch(err => {
            alert(err.response.data.message)
            this.$router.push('/login')
          })
          .finally(() => {
            this.isLoading = false
          })
      } else {
        alert('請先登入')
        this.$router.push('/login')
      }
    },
    signout () {
      console.log(123)
      document.cookie = 'W6Token=;expires=;'
      alert('已登出')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
