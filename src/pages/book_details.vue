<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import { Book, my_collection } from '@/composables/collection';
import { getBookById } from '@/composables/api_calls';
import Loader from '@/components/Loader.vue';
import { useToast } from 'primevue';

// Create a router instance
const router = useRouter();

// Inject the toast
const showToast = inject('showToast');

// States
let loading = ref(true);
let book = ref(null);

// Get the book details on mounted
onMounted(async () => {
  try {
    // Get the book details
    book.value = await getBookById(router.currentRoute.value.params.id);
  } catch (error) {
    // Log the error
    console.error(error);
  } finally {
    loading.value = false;
  }
});

// Function to add a book to the collection
const addToCollection = () => {
  try {
    // Check if we have all the necessary data
    if (!book.value) return;

    // Create a new book instance
    my_collection.addBook(new Book({
      id: book.value.id,
      title: book.value.title,
      authors: book.value.authors,
      description: book.value.description,
      isbn_13: book.value.isbn_13,
      page_count: book.value.page_count,
      publisher: book.value.publisher,
      published_date: book.value.published_date,
      average_rating: book.value.average_rating,
      cover: book.value.cover,
      my_rating: 0,
      status: 'want to read',
    }));

    // Show a success message toast
    showToast('success', 'Livre ajouté avec succès', 'Le livre a bien été ajouté dans votre collection', 3000);

    // Navigate to the collection page
    router.push('/library');

  } catch (error) {
    // Display the error in the console
    console.log(error);

    // Show an error message toast
    showToast('error', 'Oups... une erreur est survenue', 'Une erreur est survenue lors de l\'ajout du livre à votre collection', 3000);
  }
  }
</script>


<template>
  
  <div class="w-full h-full py-8">
    <!-- Page Title -->
    <h1 class="text-5xl text-primary font-bold text-center drop-shadow">Détails du livre</h1>
    <div class="w-full h-full mt-8">
      <!-- Loading State -->
      <Loader v-if="loading" />

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-12 px-[5%] mx-auto">
        <!-- Book cover -->
        <div class="w-full h-full flex justify-end">
          <img v-if="book.cover" :src="book.cover" alt="Image du livre" class="w-[300px] h-[450px] aspect-[2/3] object-cover" />
        </div>

        <!-- Book details -->
        <div>
          <!-- Book title and year of publication -->
          <h2 class="text-3xl font-bold">{{ book.title }} <span class="font-normal">({{ book.published_date.slice(0, 4) }})</span></h2>

          <!-- Book authors -->
          <p class="text-2xl">{{ book.authors && book.authors.join(', ') }}</p>

          <!-- Book average rating -->
          <span class="text-[#F48B00] flex items-center gap-0.5 mt-1 text-xs">
            <i v-for="star in Math.floor(book.average_rating || 0)" key="star" class="pi pi-star-fill"
              aria-hidden="true"></i>
            <i v-if="book.average_rating && (book.average_rating || 0) % 1 !== 0"
              class="pi pi-star-half-fill" aria-hidden="true"></i>
          </span>

          <!-- Book description -->
          <p class="mt-3 text-sm">{{ book.description.length > 995 ? book.description.slice(0, 995) + '...' : book.description }}</p>
          

          <div class="mt-4 space-y-0.5">
            <!-- Book ISBN-13 -->
            <p class=""><span class="font-semibold">ISBN-13:</span> {{ book.isbn_13}}</p>
            <!-- Book number of pages -->
            <p class=""><span class="font-semibold">Nombre de pages:</span> {{ book.page_count }} pages</p>
            <!-- Book publisher -->
            <p class=""><span class="font-semibold">Éditeur:</span> {{ book.publisher }}</p>
          </div>

          <!-- Add to collection button -->
          <button type="button" class="bg-primary px-4 py-2 rounded-full shadow-lg hover:opacity-80 transition-opacity duration-300 mt-4 flex items-center gap-2" @click="addToCollection"><i class="pi pi-plus text-sm"></i>Ajouter au bibliothèque</button>
        </div>
      </div>
    </div>
 </div>
</template>
