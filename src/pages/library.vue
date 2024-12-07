<script setup>
import { toRefs, watch, reactive } from 'vue';
import { my_collection } from '@/composables/collection';
import Book from '@/components/Book.vue';

const books = reactive(my_collection.getBooks());

watch(books, (newBooks) => {
  books.value = newBooks;
});
</script>
 
<template>
 <div class="flex flex-col gap-4 items-center h-full min-h-[calc(100vh-130px)]">
  <h1 class=" mt-12 text-4xl text-primary font-bold tracking-wide">Ma Bibliothèque</h1>
  <p class="font-medium -mt-3">Mes livres enregistrés sur Readr</p>

  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full h-full mt-8 px-[5%] mx-auto">

    <!-- Collection -->
    <template v-if="books.length > 0">
    <Book v-for="(book, index) in books" :key="`book-${index}`" :book="book" />
  </template>

    <!-- Empty collection -->
    <template v-else>
      <div class="flex flex-col items-center justify-center gap-4 col-span-1 md:col-span-3 lg:col-span-5 w-full h-full mt-8">
        <i class="pi pi-exclamation-circle text-8xl text-primary animate-pulse"></i>
        <p class="text-xl text-center w-[80%] mx-auto">Il n'y a aucun articles dans votre bibliotheque pour le moment.</p>
      </div>
    </template>
  </div>
 </div>
</template>
