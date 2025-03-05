<script setup>
import { ref, onMounted, h, reactive } from 'vue';
import { Table, Tag, Button, Space, message, Card } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import apiClient from '@/axios';
import { formatDate } from '@/assets/js/script';
import Layout from '@/layouts/Layout.vue';

const loading = ref(false);
const orders = ref([]);
const router = useRouter();
const paymentMethods = ref([]);

const paymentStatusMapping = reactive({
    paid: { label: 'Đã thanh toán', color: 'green' },
    unpaid: { label: 'Chưa thanh toán', color: 'blue' },
})


const orderStatusMapping = reactive({
    transaction: { label: 'Đẩy qua hãng vận chuyển', color: 'blue' },
    storage: { label: 'Đã vận chuyển', color: 'green' },
    cancel: { label: 'Vận chuyển sau', color: 'red' },
})

const fetchPaymentMethods = async () => {
    try {
        const response = await apiClient.get('/orders/payment_method');
        paymentMethods.value = response.data;

    } catch (error) {
        console.error('Không thể tải danh sách phương thức thanh toán', error);
    }
};
const columns = [
    // { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Mã đơn hàng', dataIndex: 'orderCode', key: 'orderCode', width: 150 },
    { title: 'Khách hàng', dataIndex: 'customer', key: 'customer', width: 200 },
    { title: 'Địa chỉ giao hàng', dataIndex: 'address_shipping', key: 'address_shipping', width: 250 },
    { title: 'Khu vực', dataIndex: 'area', key: 'area', width: 150 },
    // { title: 'Phí giao hàng', dataIndex: 'deliveryCost', key: 'deliveryCost', width: 150, customRender: ({ text }) => `${text.toLocaleString()}đ` },
    // { title: 'Giá trị đơn', dataIndex: 'price', key: 'price', width: 150, customRender: ({ text }) => `${text.toLocaleString()}đ` },
    // { title: 'Giảm giá', dataIndex: 'discount', key: 'discount', width: 150, customRender: ({ text }) => `${text.toLocaleString()}đ` },
    // { title: 'Thuế', dataIndex: 'tax', key: 'tax', width: 120, customRender: ({ text }) => text ? `${text.toLocaleString()}đ` : 'Miễn thuế' },
    // { title: 'Phương thức thanh toán', key: 'paymentMethod', width: 180, customRender: ({ record }) => `${paymentMethods.value.find(method => record.pay)}` }
    { title: 'Thành tiền', key: 'total', width: 180, customRender: ({ record }) => `${(record.price + record.deliveryCost - record.discount + (record.tax || 0)).toLocaleString()}đ` },
    {
        title: 'Trạng thái thanh toán',
        dataIndex: 'payment',
        key: 'payment',
        width: 180,
        customRender: ({ text }) => {
            const status = paymentStatusMapping[text] || { label: 'Không xác định', color: 'default' };
            return h(Tag, { color: status.color }, () => status.label);
        },
    },
    {
        title: 'Trạng thái đơn hàng',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        width: 180,
        customRender: ({ text }) => {
            const status = orderStatusMapping[text] || { label: 'Không xác định', color: 'default' };
            return h(Tag, { color: status.color }, () => status.label);
        },
    },
    // {
    //     title: 'Sản phẩm',
    //     dataIndex: 'items',
    //     key: 'items',
    //     width: 300,
    //     customRender: ({ record }) => {
    //         return record.items.map(item =>
    //             h('div', {}, [
    //                 h('img', { src: item.varian.image, width: 50, height: 50, style: 'margin-right: 10px;' }),
    //                 h('span', {}, `${item.varian.skuCode} - ${item.varian.sellPrice.toLocaleString()}đ x ${item.quantity}`)
    //             ])
    //         );
    //     }
    // },
    {
        title: 'Ngày tạo',
        dataIndex: 'created_at',
        key: 'created_at',
        width: 180,
        customRender: ({ text }) => formatDate(text),
    },
    // {
    //     title: 'Ngày cập nhật',
    //     dataIndex: 'updated_at',
    //     key: 'updated_at',
    //     width: 180,
    //     customRender: ({ text }) => formatDate(text),
    // }
];

const fetchOrders = async () => {
    loading.value = true;
    try {
        const response = await apiClient.get('/orders');
        orders.value = response.data;
    } catch (error) {
        console.error('Không thể tải danh sách đơn hàng', error);
        message.error('Lỗi khi tải danh sách đơn hàng!');
    } finally {
        loading.value = false;
    }
};



onMounted(() => {
    fetchOrders();
    fetchPaymentMethods();
});
</script>

<template>
    <Layout>
        <template #customHeader>
            <router-link :to="{ name: 'createOrder' }">
                <a-button type="primary">Tạo đơn hàng</a-button>
            </router-link>
        </template>
        <template #content>
            <Card :loading="loading" title="Danh sách đơn hàng">
                <Table :columns="columns" :dataSource="orders" rowKey="orderCode">
                    <template #bodyCell="{ text, column, record }">
                        <template v-if="column.key === 'orderCode'">
                            <router-link :to="{ name: 'productDetail', query: { id: record.orderCode } }">
                                {{ record.orderCode }}
                            </router-link>
                        </template>
                    </template>
                </Table>
            </Card>
        </template>
    </Layout>
</template>

<style scoped>
.table-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
}
</style>
