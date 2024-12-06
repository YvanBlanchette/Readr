<script setup>
import Hero from '@/components/Hero.vue'
import Swiper from '@/components/Swiper.vue'
</script>
 
<template>
  <main class="w-[100vw] min-h-[calc(100vh-90px)] pb-24">
    <Hero />

    <section class="w-full h-full min-h-[250px] mt-12">
      <h2 class="text-4xl font-bold mb-6 ml-8">Romans dramatiques</h2>
      <Swiper genre="thriller" />
    </section>

    <section class="w-full h-full min-h-[250px] mt-12">
      <h2 class="text-4xl font-bold mb-6 ml-8">Romans romantiques</h2>
      <Swiper genre="romance" />
    </section>

    <section class="w-full h-full min-h-[250px] mt-12">
      <h2 class="text-4xl font-bold mb-6 ml-8">Biographies</h2>
      <Swiper genre="biography" />
    </section>

  </main>
</template>
