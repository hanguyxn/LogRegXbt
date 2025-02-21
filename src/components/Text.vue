<script setup>
import { defineProps } from 'vue';
defineProps({
  text: {
    type: String
  },
  textType: {
    type: String,
    default: "custom-text"
  }
})

</script>

<template>
  <p :class="textType">
    {{ text }}
  </p>
</template>

<style scoped>
.custom-text {
  color: #000;
  font-weight: 500;
}

.larger {
  font-weight: 700;
  font-size: 22px;
  line-height: 27px;
}

.small {
  color: #161414aa;
}
</style>
