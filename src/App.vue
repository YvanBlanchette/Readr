<style>
body {
  @apply overflow-x-hidden bg-white;
}
.overflow-y-hidden {
  overflow-y: hidden;
}
</style>

<script setup>
import { ref, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Searchbar from './components/Searchbar.vue'
import Toaster from './components/Toaster.vue'

const isMenuOpen = ref(false);

// Prevent scrolling when the navigation is open
watch(isMenuOpen, (newValue) => {
  document.body.classList.toggle('overflow-y-hidden', newValue);
});
</script>

<template>
  <Toaster>
  <div class="w-screen min-h-[100vh] flex flex-col justify-between" :class="{ 'overflow-y-hidden': isMenuOpen }">
    <Header @toggle-menu="isMenuOpen = !isMenuOpen" />
    <RouterView class="flex-1" />
    <Footer />
  </div>

  
  <!-- Mobile Navigation -->
  <div v-if="isMenuOpen" class="md:hidden fixed top-[90px] w-[100vw] h-[calc(100vh-90px)] bg-white z-50 flex flex-col items-center gap-4 justify-between py-[5vh]">
    <div class="flex flex-col items-center gap-12">
      <Searchbar />
      <RouterLink @click="isMenuOpen = !isMenuOpen" to="/">Accueil</RouterLink>
      <RouterLink @click="isMenuOpen = !isMenuOpen" to="/library">Ma Bibliothèque</RouterLink>
    </div>
    <div class="flex flex-col items-center gap-8 w-[80%]">
      <p class="text-sm"> 2024 Yvan jr Blanchette - Tous droits reservés</p>
    </div>
  </div>
</Toaster>
</template>