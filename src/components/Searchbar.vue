<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import InputGroup from 'primevue/inputgroup';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const router = useRouter();

const search_term = ref('');

const handleClick = () => {
  if (search_term.value.trim() === '') return;
  router.push({ path: '/search', query: { q: search_term.value } });
  search_term.value = '';
}
</script>

<template>
  <!-- Search Bar -->
      <InputGroup>
        <InputText @keyup.enter="handleClick" v-model="search_term" type="text" placeholder="Recherche..." class="bg-[#FCDB00]/10 px-6 py-2 rounded-l-full min-w-[350px] shadow-inner" />
        <Button @click="handleClick" icon="pi pi-search" aria-label="Recherche" class="bg-[#FCDB00]/30 hover:bg-[#FCDB00]/40 active:shadow-inner px-5 py-2 rounded-r-full w-[50px] active:text-sm" />
      </InputGroup>
</template>
