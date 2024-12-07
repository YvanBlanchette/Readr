<script setup>
import { onMounted, ref } from 'vue';
import { searchBooks } from '@/composables/api_calls';
import { useRouter } from 'vue-router';
import Loader from '@/components/Loader.vue';
import Book from '@/components/Book.vue';

// Create a router instance
const router = useRouter();

// States
let loading = ref(true);
const books = ref([]);
const mappedBooks = ref([]);
const search_term = ref(router.currentRoute.value.query.q);

onMounted(async () => {
  try {
    const response = await searchBooks(search_term.value);
    mappedBooks.value = response.items;
    console.log(mappedBooks.value);
  } catch (error) {
    console.error('Erreur lors de la recherche de livres :', error);
  } finally {
    loading.value = false;
  }
});
</script>
 
<template>
  <div class="flex flex-col gap-4 items-center h-full min-h-[calc(100vh-130px)] py-12">
  <h1 class="text-4xl text-primary font-bold tracking-wide drop-shadow-sm">Résultats de la recherche</h1>
  <p class="text-xl font-medium -mt-3">"{{ search_term }}"</p>

  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10 w-full h-full mt-6 px-[5%] mx-auto">

    <!-- Loading -->
    <template>
      <div class="col-span-1 md:col-span-3 lg:col-span-5 w-full h-full mt-8">
        <Loader v-if="loading" />
      </div>
    </template>

    <!-- Search results -->
    <template v-if="mappedBooks.length > 0">
      <Book v-for="book in mappedBooks" :key="book.id" :book="book" />
    </template>

    <!-- Empty results -->
    <template v-else>
      <div class="flex flex-col items-center justify-center gap-4 col-span-1 md:col-span-3 lg:col-span-5 w-full h-full mt-8">
        <i class="pi pi-exclamation-circle text-8xl text-primary animate-pulse"></i>
        <p class="text-xl text-center w-[80%] mx-auto">Aucun livre trouvé pour "{{ search_term }}"</p>
      </div>
    </template>
  </div>
 </div>
</template>