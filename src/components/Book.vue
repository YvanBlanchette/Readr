<script setup>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { my_collection } from '@/composables/collection';

// Create a router instance
const router = useRouter();

// Define props
const props = defineProps({
  book: Object,
});

// Destructure props
const { book } = toRefs(props);

// Function to navigate to the book details page
const navigateToBookDetailsPage = (id) => {
  router.push(`/books/${id}`);
}

const removeBook = (id) => {
  my_collection.removeBook(id);
}
</script>



<template>
  <div class="relative w-full h-full max-w-[200px] aspect-[2/3] group cursor-pointer">
    <img :src="book.cover" alt="Image du livre" class="w-full h-full max-w-[200px] aspect-[2/3] object-cover">

    <!-- Book status badge -->
    <div v-if="book.status !== 'none'"
      class="absolute top-2 left-2 rounded-full w-8 h-8 border border-black/10 bg-[#F48B00] shadow-sm z-20 flex items-center justify-center">
      <i v-if="book.status === 'want to read'" class="pi pi-bookmark text-white" aria-hidden="true"
        title="Veux le lire"></i>
      <i v-if="book.status === 'reading'" class="pi pi-book text-white" aria-hidden="true" title="Lecture en cours"></i>
      <i v-if="book.status === 'read'" class="pi pi-check text-white" aria-hidden="true" title="Lu"></i>
    </div>


    <div
      class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex absolute inset-0 p-2 flex-col justify-center bg-black/70 text-white">
      <p class="font-bold text-center text-lg">{{ book.title && book.title.length > 18 ? book.title.slice(0, 18) + '...'
        :
        book.title }}</p>
      <p class="text-center">{{ book.authors && book.authors.join(', ') }}</p>
      <p class="text-center">({{ book.published_date.slice(0, 4).slice(0, 4) }})</p>
      <span class="text-[#F48B00] flex items-center gap-0.5 mt-1 text-xs">
        <i v-for="star in Math.floor(book.averageRating || 0)" key="star" class="pi pi-star-fill"
          aria-hidden="true"></i>
        <i v-if="book.averageRating && (book.averageRating || 0) % 1 !== 0" class="pi pi-star-half-fill"
          aria-hidden="true"></i>
      </span>

      <label for="status" class="text-primary mt-2 ml-2 font-semibold">Statut</label>
      <select name="status" v-model="book.status" id="status" class="ml-2 bg-transparent active:text-black">
        <option class="text-black" value="none">Non lu</option>
        <option class="text-black" value="want to read">Veux le lire</option>
        <option class="text-black" value="reading">En cours de lecture</option>
        <option class="text-black" value="read">Lecture terminée</option>
      </select>

      <!-- Button to navigate to the book details page -->
      <button @click="navigateToBookDetailsPage(book.id)"
        class="text-sm bg-primary px-3 py-2 rounded-full shadow-lg hover:opacity-80 transition-opacity duration-300 mt-4 flex items-center justify-center font-semibold">Voir
        détails</button>

      <!-- Button to remove the book -->
      <button @click="removeBook(book.id)"
        class="absolute top-1 right-1 rounded-full w-8 h-8 border border-black/10  hover:bg-white/40 shadow-sm z-20 flex items-center justify-center">
        <i class="pi pi-times text-white" aria-hidden="true" title="Retirer de la collection"></i>
      </button>
    </div>
  </div>
</template>
