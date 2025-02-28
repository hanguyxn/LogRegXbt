<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Layout from '@/layouts/Layout.vue'
import Text from '@/components/Text.vue'

const route = useRoute()
const userId = ref(route.query.id)


watch(() => route.query.id, (newId) => {
    userId.value = newId;
});


// const employeeDetail = reactive({

// })



</script>

<template>
    <Layout>
        <template #content>
            <Text class="larger" :text="`User ID: ${userId}`" />
        </template>
    </Layout>
</template>
