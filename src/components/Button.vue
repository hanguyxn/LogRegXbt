<script setup>
import { defineProps } from 'vue'
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  text: {
    type: String,
    default: 'Click me!',
  },
  btnClass: {
    type: String,
    default: 'btn',
  },
  isDisable: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button :class="[btnClass, { 'btn-disable': isDisable }]" :type="type" :disabled="isDisable">
    <slot class="slot"></slot>{{ text }}
  </button>
</template>

<style scoped>
.btn {
  font-size: 14px;
  width: 100%;
  border-radius: 6px;
  padding: 4px 15px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  border: none;
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
  color: #fff;
  background-color: #1677ff;
}
.btn-primary:hover {
  background-color: #4096ff;
}

.btn-outline {
  height: 40px;
  font-size: 16px;
  border: 1.5px solid #a3aed0;
  background-color: #fff;
  color: #1b2559;
}

.btn-disable {
  cursor: not-allowed;
  border-color: #d9d9d9;
  color: rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.04);
  box-shadow: none;
}
.btn-disable:hover {
  border-color: #bbbaba;
  color: rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.07);
}
</style>
