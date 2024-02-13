<template>
    <h1>後台登入</h1>
    <VueLoading :active="isLoading" />
    <RouterLink to="/" class="d-inline-block mb-3">回前台</RouterLink>
    <div class="row">
      <div class="col-4 mx-auto text-start">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="user.username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">password</label>
            <input type="password" class="form-control" id="password" placeholder="password" v-model="user.password">
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-primary">登入</button>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    login () {
      this.isLoading = true
      const url = `${import.meta.env.VITE_APP_API_URL}/admin/signin`
      const data = this.user

      this.$http.post(url, data)
        .then(res => {
          const { expired, token } = res.data
          document.cookie = `W6Token=${token}; expires=${new Date(expired)}`
          alert(res.data.message)
          this.$router.push('/admin/products')
        })
        .catch(err => {
          alert(err.response.data.message)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
