<script setup>
import { onMounted } from 'vue';
import Layout from '@/layouts/Layout.vue';
import apiClient from '@/axios';
import router from '@/router';
import showMessage from '@/assets/js/message';

const getUser = async () => {
    try {
        const response = await apiClient.get("/auth/users");
        console.log(response);
    } catch (error) {
        showMessage('warning', 'Vui lòng đăng nhập');
        router.replace("/login");
    }
};


onMounted(getUser);
</script>

<template>
    <Layout>
        <template #content>
            Trang chủ
        </template>
    </Layout>
</template>
