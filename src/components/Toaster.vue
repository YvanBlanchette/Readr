<script setup>
import { provide, ref } from 'vue';
import Toast from './Toast.vue';

const toastVisible = ref(false);
const toastType = ref('');
const toastTitle = ref('');
const toastMessage = ref('');

const showToast = (type, title, message, delay = 3000) => {
  toastType.value = type;
  toastTitle.value = title;
  toastMessage.value = message;
  toastVisible.value = true;

  setTimeout(() => {
    toastVisible.value = false;
  }, delay || 3000);
};

const hideToast = () => {
  toastVisible.value = false;
}

provide('showToast', showToast);
</script>
 
<template>
  <Toast v-if="toastVisible" :type="toastType" :title="toastTitle" :message="toastMessage" @hideToast="hideToast" />
  <slot />
</template>
