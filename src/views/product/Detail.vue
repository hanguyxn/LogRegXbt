<script setup>
import Layout from '@/layouts/Layout.vue'
import { useRoute } from 'vue-router';
import { watch, ref } from 'vue';
const route = useRoute()
const productId = ref(route.query.id)

watch(productId, (newId) => {
    productId.value = newId
})


</script>


<template>
    <Layout>
        <template #content>
            <p>Product details: {{ productId }}</p>
        </template>
    </Layout>
</template>