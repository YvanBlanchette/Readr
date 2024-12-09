<script setup>
const props = defineProps(['type', 'title', 'message']);

const emit = defineEmits(['hideToast']);

const hideToast = () => {
  emit('hideToast');
};


</script>
 
<template>
 <div class="fixed min-w-[300px] bottom-4 right-4 p-4 bg-white text-black rounded-lg shadow-xl border" :class="props.type === 'success' ? 'bg-green-50 border-green-100' : props.type === 'error' ? 'bg-red-50' : ''">
  <header class="flex items-center justify-between">
    <h2 class="mb-1 text-lg font-bold" :class="props.type === 'success' ? 'text-green-700' : props.type === 'error' ? 'text-red-600' : ''">{{ props.title }}</h2>
    <button @click="hideToast" class="text-gray-900 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out" :class="props.type === 'success' ? 'hover:bg-green-200' : props.type === 'error' ? 'hover:bg-red-200' : ''">
      <i class="pi pi-times" aria-hidden="true"></i>
    </button>
  </header>
  <main>
    <p>{{ props.message }}</p>
  </main>
 </div>
</template>
