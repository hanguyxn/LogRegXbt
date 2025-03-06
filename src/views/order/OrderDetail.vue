<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Card, Descriptions, message } from 'ant-design-vue';
import apiClient from '@/axios';
import Layout from '@/layouts/Layout.vue';

const route = useRoute();
const order = ref(null);
const loading = ref(false);

// Lấy thông tin chi tiết đơn hàng
const fetchOrderDetail = async () => {

    try {
        loading.value = true;
        // const response = await apiClient.get(`/orders/${route.params.orderId}`);
        setTimeout(() => {
            order.value = {
                orderCode: 'DH001',
                customer: 'Nguyễn Văn A',
                address_shipping: '123 Đường ABC, Quận XYZ, TP.HCM',
                orderStatus: 'Đã giao hàng',
                price: 1000000
            };
        }, 1000);
    } catch (error) {
        console.error('Lỗi tải đơn hàng', error);
        message.error('Không thể tải thông tin đơn hàng!');
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchOrderDetail();
});
</script>

<template>
    <Layout>
        <template #content>
            <Card :loading="loading" v-if="order">
                <Descriptions title="Chi tiết đơn hàng" bordered>
                    <Descriptions.Item label="Mã đơn hàng">{{ order.orderCode }}</Descriptions.Item>
                    <Descriptions.Item label="Khách hàng">{{ order.customer }}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">{{ order.address_shipping }}</Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">{{ order.orderStatus }}</Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">{{ order.price }} VND</Descriptions.Item>
                </Descriptions>
            </Card>
        </template>
    </Layout>
</template>
