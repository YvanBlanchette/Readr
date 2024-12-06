<style>
a:hover {
  @apply underline underline-offset-4 decoration-4 decoration-[#F48B00]
}

a.router-link-active {
  @apply underline underline-offset-4 decoration-4 decoration-[#F48B00] pointer-events-none
}
</style>

<script setup>
import Searchbar from '@/components/Searchbar.vue'
import Button from 'primevue/button'
</script>

<template>
  <header class="w-full h-[90px]  shadow-xl">
    <div class="max-w-[90%] h-full flex justify-between items-center mx-auto">
      <router-link to="/">
        <img src="@/assets/images/readr_logo.svg" alt="Readr logo" class="h-[70px]">
      </router-link>

      <div class="hidden md:block">
        <Searchbar />
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center justify-end gap-4">
        <router-link :to="{name:'home'}">Accueil</router-link>
        <router-link :to="{name:'library'}">Ma Bibliothèque</router-link>
      </nav>

      <!-- Mobile Navigation -->
      <div class="md:hidden">
        <Button @click="$emit('toggle-menu')" icon="pi pi-bars" severity="warn" variant="text" rounded aria-label="Hamburger Menu" class="w-[50px] h-[50px] text-2xl text-[#F48B00] hover:bg-[#F48B00]/5 transition-all duration-200" />
      </div>
    </div>
  </header>
</template>
