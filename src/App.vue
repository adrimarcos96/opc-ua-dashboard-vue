<script setup>
  import HeaderComponent from './components/header/HeaderComponent.vue'
  import FooterMobileComponent from './components/footer-mobile/FooterMobileComponent.vue'
</script>

<template>
  <div class="min-[981px]:flex">
    <HeaderComponent />

    <main class="w-full h-screen overflow-y-auto max-[981px]:pt-24">
      <router-view></router-view>
      <FooterMobileComponent />
    </main>

  </div>
</template>

<style scoped>
</style>
