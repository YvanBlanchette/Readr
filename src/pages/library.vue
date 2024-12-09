<script setup>
import { reactive, inject, onMounted, ref } from 'vue';
import { my_collection } from '@/composables/collection';
import Book from '@/components/Book.vue';

// Create a reactive collection
const books = reactive(my_collection.getBooks());

const showToast = inject('showToast');

// Flag to trigger re-render once after book removal
const hasUpdated = ref(false);

// Method to handle book removed event
const handleBookRemoved = (id) => {
  my_collection.removeBook(id);
  showToast('success', 'Livre supprimé', 'Le livre a bien été retiré de votre bibliothèque.', 3000);
  hasUpdated.value = true; // Set flag for re-render
};

onMounted(() => {
  if (hasUpdated.value) { 
    // Force re-render after removal of a book
    this.$forceUpdate();
    hasUpdated.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col gap-4 items-center h-full min-h-[calc(100vh-130px)]">
    <h1 class="mt-12 text-4xl text-primary font-bold tracking-wide">Ma Bibliothèque</h1>
    <p class="font-medium -mt-3">Mes livres enregistrés sur <span class="text-lg text-primary font-bold">Readr</span></p>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full h-full mt-8 px-[5%] mx-auto">

      <template v-if="books.length > 0">
        <Book v-for="(book) in books" :key="book.id" :book="book" @bookRemoved="handleBookRemoved" />
      </template>

      <template v-else>
        <div class="flex flex-col items-center justify-center gap-4 col-span-1 md:col-span-3 lg:col-span-5 w-full h-full mt-12">
          <i class="pi pi-exclamation-circle text-8xl text-primary animate-pulse"></i>
          <p class="text-xl text-center w-[80%] mx-auto">Il n'y a aucun articles dans votre bibliothèque pour le moment.</p>
        </div>
      </template>
    </div>
  </div>
</template>