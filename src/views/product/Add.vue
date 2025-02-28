<script setup>
import Layout from '@/layouts/Layout.vue'
import Text from '@/components/Text.vue'
import { Flex, message, Upload, Divider } from 'ant-design-vue'
import VueQuill from '@/components/VueQuill.vue'
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { watch, ref, reactive } from 'vue'
import apiClient from '@/axios'
import showMessage from '@/assets/js/message'

const { Dragger } = Upload
const taxApplicable = ref(false)
const addProductBtnLoading = ref(false)


const imgFilePath = ref(null)
const draggerProps = reactive({
    name: 'file',
    multiple: false,
    beforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            console.log(file)
            showMessage('warning', 'File phải nhỏ hơn 2MB')
            return Upload.LIST_IGNORE
        }

        imgFilePath.value = file
        return false
    },
    accept: "image/png, image/jpeg, image/jpg"
})


const data = reactive([
    { name: 'Kích thước', attribute: ['L', 'M', 'XL'] },
    { name: 'Màu sắc', attribute: ['Đỏ', 'Xanh'] },
    { name: 'Chất liệu', attribute: ['Vải'] }
])

// const convertAttributes = (arr) => {
//     return arr.map(item => ({
//         name: item.name,
//         attribute: item.attribute.map(value => ({
//             attributeValue: value,
//             quantity: 50
//         }))
//     }))
// }

const formData = reactive({
    attributes: data,
    name: 'trinh 1',
    sku_code: 'trinh 1',
    barcode: 'trinh 1',
    unit: 'VND',
    description: 'trinh 1',
    sell_price: 2,
    compare_price: 5,
    quantity: 1,
    cost: 1,
    branch: 'GUCCI'
})


watch(data, (newData) => {
    formData.attributes = newData
}, { deep: true })

const AddProduct = async () => {
    try {
        addProductBtnLoading.value = true
        let payload = new FormData();

        if (imgFilePath.value) {
            payload.append('file', imgFilePath.value);
        }

        payload.append('name', formData.name);
        payload.append('sku_code', formData.sku_code);
        payload.append('barcode', formData.barcode);
        payload.append('unit', formData.unit);
        payload.append('description', formData.description);
        payload.append('sell_price', formData.sell_price);
        payload.append('compare_price', formData.compare_price);
        payload.append('quantity', formData.quantity);
        payload.append('cost', formData.cost);
        payload.append('branch', formData.branch);
        formData.attributes.forEach((attr, index) => {
            payload.append(`attributes[${index}][name]`, attr.name);

            attr.attribute.forEach((item, subIndex) => {
                payload.append(`attributes[${index}][attribute][${subIndex}][attributeValue]`, item);
            });
        });

        const response = await apiClient.post('/products', payload, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        message.success("Thêm sản phẩm thành công!");
        console.log(response.data);
    } catch (error) {
        message.error("Lỗi khi thêm sản phẩm!");
        console.error(error);
    } finally {
        addProductBtnLoading.value = false
    }
};

</script>

<template>
    <Layout>
        <template #customHeader>
            <Flex gap="small" justify="end">
                <router-link :to="{ name: 'products' }">
                    <a-button color="primary" variant="outlined">Hủy</a-button>
                </router-link>
                <form @submit.prevent="AddProduct">
                    <a-button :loading="addProductBtnLoading" htmlType="submit" type="primary">Thêm sản phẩm</a-button>
                </form>
            </Flex>
        </template>

        <template #content>
            <Text text="Thêm sản phẩm" class="larger"></Text>
            <Divider orientation="left">Thông tin sản phẩm</Divider>

            <div class="group">
                <Flex>
                    <Text text="Tên sản phẩm:" />
                    <p class="error-message">*</p>
                </Flex>

                <a-input v-model:value="formData.name" placeholder="Nhập tên sản phẩm" />
            </div>

            <Flex justify="space-between" gap="small">
                <div class="group">
                    <Text text="Mã SKU" />
                    <a-input v-model:value="formData.sku_code" placeholder="Nhập mã SKU" />
                </div>
                <div class="group">
                    <Text text="Mã vạch/Barcode" />
                    <a-input v-model:value="formData.barcode" placeholder="Nhập mã vạch" />
                </div>
            </Flex>

            <div class="group">
                <Text text="Đơn vị tính" />
                <a-input v-model:value="formData.unit" placeholder="Nhập đơn vị tính" />
            </div>

            <div class="group">
                <Text text="Mô tả" />
                <VueQuill v-model="formData.description" />
            </div>

            <Divider orientation="left">Thuộc tính sản phẩm</Divider>
            <a-table
                :columns="[{ title: 'Tên thuộc tính', dataIndex: 'name' }, { title: 'Giá trị', dataIndex: 'attribute' }]"
                :dataSource="data" :pagination="false">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'name'">
                        <a-input v-model:value="record.name" placeholder="Tên thuộc tính" />
                    </template>
                    <template v-else>
                        <Flex gap="small">
                            <a-select v-model:value="record.attribute" mode="tags" placeholder="Nhập giá trị"
                                style="width: 100%;" />
                            <a-button type="text" @click="record.attribute = []">
                                <DeleteOutlined />
                            </a-button>
                        </Flex>
                    </template>
                </template>
            </a-table>
        </template>

        <template #aside>
            <Divider orientation="left">Ảnh sản phẩm</Divider>
            <Dragger style="max-height: 160px" v-bind="draggerProps">
                <p class="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p class="ant-upload-text">Nhấn hoặc kéo thả tập tin vào đây để tải lên</p>
                <p className="ant-upload-hint">(Dung lượng tối đa 2MB)</p>
            </Dragger>

            <Divider orientation="left">Thông tin giá</Divider>
            <Flex justify="space-between" gap="small">
                <div class="group">
                    <Text text="Giá bán" />
                    <a-input v-model:value="formData.sell_price" suffix="₫" placeholder="0" />
                </div>
                <div class="group">
                    <Text text="Giá so sánh" />
                    <a-input v-model:value="formData.compare_price" suffix="₫" placeholder="0" />
                </div>
            </Flex>

            <div class="group">
                <Text text="Giá vốn" />
                <a-input v-model:value="formData.cost" suffix="₫" placeholder="0" />
            </div>

            <a-checkbox v-model:checked="taxApplicable">Áp dụng thuế</a-checkbox>
        </template>
    </Layout>
</template>

<style scoped>
.group {
    margin: 12px 0;
    width: 100%;
}
</style>
