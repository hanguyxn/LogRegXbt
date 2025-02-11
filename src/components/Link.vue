<script setup>
import router from "../router/index.js"
import { defineProps } from "vue";
defineProps({
  text: {
    type: String
  },
  textType:{
    type: String,
    default: "custom-text"
  },
  href:{
    type: String,
    default: "#"
  }
})

const goToUrl = (url) =>{
    router.push(url)
}

</script>

<template>
  <a @click="goToUrl(href)" :class="textType">
    {{ text }}
  </a>
</template>

<style scoped>
.custom-text {
    cursor: pointer;
    --tw-text-opacity: 1;
    color: rgb(24 144 255 / var(--tw-text-opacity, 1));
    font-weight: 500;
    font-size: 16px;
}

</style>
