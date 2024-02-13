<template>
    <h1 class="mb-3">這是前台頁面</h1>
    <div class="mb-3">
        <RouterLink to="/">首頁</RouterLink> |
        <RouterLink to="/products">前台產品列表</RouterLink> |
        <RouterLink to="/cart">前台購物車</RouterLink> |
        <RouterLink to="/login">登入後台</RouterLink>
    </div>

    <RouterView/>
</template>
