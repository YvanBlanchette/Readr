<script setup> 
</script>
 
<template>
 <div class="flex flex-col items-center justify-center h-full min-h-[calc(100vh-180px)] gap-2 mt-12">
   <i class="pi pi-exclamation-circle text-8xl text-primary animate-pulse"></i>
   <h1 class="text-4xl font-bold tracking-wide text-primary">Erreur 404 - Page introuvable</h1>
   <p class="text-lg font-semibold text-gray-400">La page que vous recherchez n'existe pas.</p>
   <router-link to="/" class="text-black bg-primary px-4 py-2 rounded-full hover:opacity-80 transition-all duration-300">Retourner à l'accueil</router-link>
 </div>

</template>
