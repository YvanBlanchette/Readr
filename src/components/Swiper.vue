<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { getBooksByGenre } from '@/composables/api_calls'
import 'swiper/css';
import 'swiper/css/navigation';
import { Keyboard, Navigation } from 'swiper/modules';

import Loader from './Loader.vue';

const modules = ref([Keyboard, Navigation]);

const props = defineProps({
  genre: String
});

let loading = ref(false);
let books = ref([]);

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

<style>
.swiper-button-prev,
.swiper-button-next {
  @apply text-[#F48B00] font-black p-8 hover:backdrop-blur-sm rounded-full hover:bg-black/30
}
</style>

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
        slidesPerView: 5,
        spaceBetween: 50,
      },
    }" class="mySwiper h-full w-[95dvw] mx-auto">

    <swiper-slide v-for="book in books" :key="book" class="relative w-full h-[150px] group cursor-pointer">
      <!-- Book Image -->
      <img v-if="book.volumeInfo.imageLinks" :src="book.volumeInfo.imageLinks.thumbnail" alt="Image du livre"
      class="w-full h-full aspect-[2/3] object-cover shadow">

      <!-- Book Informations overlay -->
      <div
        class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex absolute inset-0 p-2 flex-col justify-end bg-black/70 text-white">
        <p>{{ book.volumeInfo.title && book.volumeInfo.title.length > 25 ? book.volumeInfo.title.slice(0, 22) + '...' :
          book.volumeInfo.title }}</p>
        <p>{{ book.volumeInfo.authors && book.volumeInfo.authors.join(', ') }}</p>
        <span class="text-[#F48B00] flex items-center gap-0.5 mt-1 text-xs">
          <i v-for="star in Math.floor(book.volumeInfo.averageRating || 0)" key="star" class="pi pi-star-fill"
            aria-hidden="true"></i>
          <i v-if="book.volumeInfo.averageRating && (book.volumeInfo.averageRating || 0) % 1 !== 0"
            class="pi pi-star-half-fill" aria-hidden="true"></i>
        </span>
      </div>
    </swiper-slide>
  </swiper>
</template>
