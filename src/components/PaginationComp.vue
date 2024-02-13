<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !pagination.has_pre }" >
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="updatePage(pagination.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="i in pagination.total_pages"
        :key="i"
        class="page-item"
        :class="{ active: pagination.current_page === i }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="updatePage(i)"
        >
        {{ i }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: !pagination.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="updatePage(pagination.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pagination'],
  methods: {
    updatePage (page) {
      this.$emit('updatePage', page)
    }
  }
}
</script>
