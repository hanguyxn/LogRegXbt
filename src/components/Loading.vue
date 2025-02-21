<script setup>
import { defineProps } from 'vue';

defineProps({
    loading: Boolean
});
</script>

<template>
    <div v-if="loading" class="loading-overlay">
        <a-spin size="large" />
    </div>
</template>


<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
</style>
