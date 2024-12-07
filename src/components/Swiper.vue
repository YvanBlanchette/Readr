<style>
.swiper-button-prev, .swiper-button-next {
  @apply text-[#F48B00] hover:text-[#F48B00]/60 
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Keyboard, Navigation } from 'swiper/modules';

//* Styles imports
import 'swiper/css';
import 'swiper/css/navigation';

//* Composables imports
import { getBooksByGenre } from '@/composables/api_calls'

//* Components imports
import Loader from './Loader.vue';
import Book from './Book.vue';

// Swiper modules
const modules = ref([Keyboard, Navigation]);

// Create a router instance
const router = useRouter();

// Define props
const props = defineProps({
  genre: String
});

// Define states
let loading = ref(false);
let books = ref([]);

// Fetch books
onMounted(async () => {
  try {
    const response = await getBooksByGenre(props.genre);
    books.value = response.items;
    // console.log(books.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des livres:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading" class="w-full h-full flex justify-center p-12">
    <Loader />
  </div>
  <swiper v-else :slidesPerView="1" :spaceBetween="10" :loop="true" :keyboard="{
    enabled: true,
  }" :navigation="true" :modules="modules" :breakpoints="{
      '640': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '768': {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      '1024': {
        slidesPerView: 6,
        spaceBetween: 40,
      },
    }" class="mySwiper h-full w-[95dvw] mx-auto">

    <swiper-slide v-for="book in books" :key="book" class="relative w-full h-[150px] group cursor-pointer">
      <Book :book="book" />
    </swiper-slide>
  </swiper>
</template>