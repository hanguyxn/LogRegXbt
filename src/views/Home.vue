<script setup>
import { onMounted, ref } from 'vue';
import Layout from '@/layouts/Layout.vue';
import apiClient from '@/axios';
import router from '@/router';
import showMessage from '@/assets/js/message';


</script>

<template>
    <Layout>
        <template #content>
            Trang chủ
        </template>
    </Layout>
</template>
