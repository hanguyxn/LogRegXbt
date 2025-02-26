<script setup>
import apiClient from '@/axios';
import Layout from '@/layouts/Layout.vue';
import { computed, ref, reactive, h } from 'vue';
import { PlusCircleOutlined, SearchOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { Flex, Row, Col, Select, Upload, Button } from 'ant-design-vue'


// const getData = async () => {
//     try {
//         const response = await apiClient.get("/auth/users");
//         if (response.status === 200) {
//             console.log(response.data);
//         } else {
//             console.log("Không thể lấy dữ liệu");
//         }
//     } catch {
//         console.log("Lỗi kết nối");
//     }
// };

const products = ref([
    { id: '1', name: 'Không vc', sold: -2, createdAt: '09/12/2024', image: 'https://www.w3schools.com/images/w3schools_green.jpg' },
    { id: '2', name: 'Buộc tóc hoa tháng 11!!!!', sold: 987, createdAt: '10/05/2024', image: 'https://www.w3schools.com/images/w3schools_green.jpg' },
    { id: '3', name: 'Váy xinh 2 tmt', sold: 986, createdAt: '10/05/2024', image: 'https://www.w3schools.com/images/w3schools_green.jpg' },
    { id: '4', name: 'test payment', sold: 72, createdAt: '23/04/2024', image: 'https://www.w3schools.com/images/w3schools_green.jpg' },
    { id: '5', name: 'Hoa tươi', sold: 22088, createdAt: '17/04/2024', image: 'https://www.w3schools.com/images/w3schools_green.jpg' },
    { id: '6', name: 'Test kcn 1', sold: 34324, createdAt: '16/04/2024', image: 'https://www.w3schools.com/images/w3schools_green.jpg' },
    { id: '7', name: 'Test Hoa 2', sold: 85, createdAt: '16/04/2024', image: 'https://www.w3schools.com/images/w3schools_green.jpg' }
]);

const columns = [
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
        key: 'name',
        customRender: ({ record }) => h('div', { style: "display: flex; align-items: center;" }, [
            h('img', { src: record.image, width: 30, style: "margin-right: 8px", alt: 'Product Image' }),
            h('a', { href: `?id=${record.id}` }, record.name)
        ])
    },
    { title: 'Có thể bán', dataIndex: 'sold', key: 'sold' },
    { title: 'Nhãn hiệu', dataIndex: 'brand', key: 'brand' },
    { title: 'Ngày khởi tạo', dataIndex: 'createdAt', key: 'createdAt' }
];

const selectedRowKeys = ref([])

const rowSelection = computed(() => ({
    selectedRowKeys: selectedRowKeys.value,
    onChange: (selectedKeys) => {
        selectedRowKeys.value = selectedKeys
        console.log("Selected rows:", selectedRowKeys.value)
    }
}))
const page = reactive({
    current: 1,
    size: 5,
    totalValue: 0
})

const handlePageChange = (newPage, newSize) => {
    page.current = newPage
    page.size = newSize
    // getEmployee()
};


const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
</script>

<template>
    <Layout>
        <!-- <template #customHeader>
            <h2 style="margin: 0; font-weight: bold; color: red">Header custom</h2>
        </template> -->
        <template #nav>
            <Flex justify="end" style="width: auto; margin: 12px 12px 0 12px">

                <Button :icon="h(UploadOutlined)" class="margin-left">Xuất file</Button>
                <Upload v-bind="props">
                    <Button :icon="h(DownloadOutlined)" class="margin-left">Nhập file</Button>
                </Upload>
                <router-link :to="{ name: 'addProduct' }">
                    <a-button type="primary" :icon="h(PlusCircleOutlined)" class="margin-left">Thêm sản
                        phẩm</a-button>
                </router-link>

            </Flex>
        </template>
        <template #content>
            <div>
                <Row class="top-bar">
                    <Col flex="1 1 500px"><a-input :prefix="h(SearchOutlined)"
                        placeholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm, barcode"></a-input>
                    </Col>
                    <Col flex="0 1 500px">
                    <Select placeholder="Nhãn hiệu" style=" width: auto; margin-left: 2px;" @change="handleChange"
                        :options="[{ value: 'jack', label: 'Jack', }, { value: 'lucy', label: 'Lucy', }, {
                            value: 'Yiminghe', label: 'yiminghe',
                        }, { value: 'disabled', label: 'Disabled', disabled: true, }]" />
                    <a-button style="width: auto; margin-left: 8px;">Lưu bộ lọc</a-button>
                    </Col>
                </Row>

            </div>
            <a-table :rowSelection="rowSelection" :dataSource="products" :columns="columns" rowKey="id" :pagination="{
                total: page.totalValue,
                current: page.current,
                pageSize: page.size,
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20', '50', '100'],
                showTotal: (total) => `Tổng cộng ${total} sản phẩm`,
                onChange: handlePageChange
            }" bordered>
                <!-- <template #bodyCell="{ text, column, record }">
                    <template v-if="column.key === 'name'">
                        <a :href="`?id=${record.id}`">{{ text }}</a>
                    </template>
</template> -->
            </a-table>
        </template>
    </Layout>
</template>


<style scoped>
.margin-left {
    margin: 8px
}
</style>