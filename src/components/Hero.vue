<script setup>
 
</script>
 
<template>
 <section class="relative h-[calc(100vh-180px)] w-full">
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-3/4  flex flex-col items-center gap-8">
    <p class="text-lg lg:text-2xl text-white text-center font-medium tracking-wide">Bienvenue sur <span class="text-primary font-bold">Readr</span>, votre communauté de lecteurs en ligne ! Rejoignez-nous pour découvrir de nouveaux livres, partager vos avis et connectez avec d'autres passionnés de lecture tels que vous!</p>

    <!-- Disabled button -->
    <button disabled class="bg-gradient-to-r from-[#FCDB00] to-[#F48B00] font-semibold tracking-wider hover:shadow-inner px-5 py-2 rounded-full disabled:opacity-40">Créer un compte</button>
  </div>
    <video src="@/assets/videos/hero.mp4" autoplay loop muted class="absolute top-0 left-0 w-full h-full object-cover brightness-50" />
  </section>
</template>
