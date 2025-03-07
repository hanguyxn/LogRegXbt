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

// Thêm rules cho validation
const rules = {
    name: [
        { required: true, message: 'Vui lòng nhập tên sản phẩm', trigger: 'blur' }
    ],
    skuCode: [
        { required: true, message: 'Vui lòng nhập mã SKU', trigger: 'blur' }
    ],
    barCode: [
        { required: true, message: 'Vui lòng nhập mã vạch', trigger: 'blur' }
    ],
    unit: [
        { required: true, message: 'Vui lòng nhập đơn vị tính', trigger: 'blur' }
    ],
    sellPrice: [
        { required: true, message: 'Vui lòng nhập giá bán', trigger: 'blur' },
        { type: 'number', min: 0, message: 'Giá bán phải lớn hơn hoặc bằng 0', trigger: 'blur' }
    ],
    comparePrice: [
        { type: 'number', min: 0, message: 'Giá so sánh phải lớn hơn hoặc bằng 0', trigger: 'blur' }
    ],
    cost: [
        { required: true, message: 'Vui lòng nhập giá vốn', trigger: 'blur' },
        { type: 'number', min: 0, message: 'Giá vốn phải lớn hơn hoặc bằng 0', trigger: 'blur' }
    ]
}

const formRef = ref(null) // Thêm ref cho form

const draggerProps = reactive({
    name: 'file',
    multiple: false,
    beforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            showMessage('warning', 'File phải nhỏ hơn 2MB')
            return Upload.LIST_IGNORE
        }
        imgFilePath.value = file
        return false
    },
    accept: "image/png, image/jpeg, image/jpg"
})

const formData = reactive({
    name: '',
    skuCode: '',
    barCode: '',
    unit: '',
    description: '',
    sellPrice: 0,
    comparePrice: 0,
    quantity: 1,
    cost: 0,
    branch: 'GUCCI'
})

const AddProduct = async () => {
    try {
        // Validate form trước khi submit
        await formRef.value.validate()

        addProductBtnLoading.value = true
        let payload = new FormData();

        if (imgFilePath.value) {
            payload.append('file', imgFilePath.value);
        }

        Object.keys(formData).forEach(key => {
            payload.append(key, formData[key]);
        });

        const response = await apiClient.post('/products', payload, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        message.success("Thêm sản phẩm thành công!");
        console.log(response.data);
    } catch (error) {
        if (error.errorFields) {
            message.error("Vui lòng kiểm tra lại thông tin!");
        } else {
            message.error("Lỗi khi thêm sản phẩm!");
            console.error(error);
        }
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
                <div>
                    <a-button :loading="addProductBtnLoading" type="primary" @click="AddProduct">
                        Thêm sản phẩm
                    </a-button>
                </div>
            </Flex>
        </template>

        <template #content>
            <Text text="Thêm sản phẩm" class="larger"></Text>
            <Divider orientation="left">Thông tin sản phẩm</Divider>

            <a-form ref="formRef" :model="formData" :rules="rules">
                <div class="group">
                    <Flex>
                        <Text text="Tên sản phẩm:" />
                        <p class="error-message">*</p>
                    </Flex>
                    <a-form-item name="name">
                        <a-input v-model:value="formData.name" placeholder="Nhập tên sản phẩm" />
                    </a-form-item>
                </div>

                <Flex justify="space-between" gap="small">
                    <div class="group">
                        <Text text="Mã SKU" />
                        <a-form-item name="skuCode">
                            <a-input v-model:value="formData.skuCode" placeholder="Nhập mã SKU" />
                        </a-form-item>
                    </div>
                    <div class="group">
                        <Text text="Mã vạch/barCode" />
                        <a-form-item name="barCode">
                            <a-input v-model:value="formData.barCode" placeholder="Nhập mã vạch" />
                        </a-form-item>
                    </div>
                </Flex>

                <div class="group">
                    <Text text="Đơn vị tính" />
                    <a-form-item name="unit">
                        <a-input v-model:value="formData.unit" placeholder="Nhập đơn vị tính" />
                    </a-form-item>
                </div>

                <div class="group">
                    <Text text="Mô tả" />
                    <VueQuill v-model="formData.description" />
                </div>
            </a-form>
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
            <a-form ref="formRef" :model="formData" :rules="rules">
                <Flex justify="space-between" gap="small">
                    <div class="group">
                        <Text text="Giá bán" />
                        <a-form-item name="sellPrice">
                            <a-input-number v-model:value="formData.sellPrice" suffix="₫" placeholder="0" type="number"
                                style="width: 100%" />
                        </a-form-item>
                    </div>
                    <div class="group">
                        <Text text="Giá so sánh" />
                        <a-form-item name="comparePrice">
                            <a-input-number v-model:value="formData.comparePrice" suffix="₫" placeholder="0"
                                type="number" style="width: 100%" />
                        </a-form-item>
                    </div>
                </Flex>

                <div class="group">
                    <Text text="Giá vốn" />
                    <a-form-item name="cost">
                        <a-input-number v-model:value="formData.cost" suffix="₫" placeholder="0" type="number"
                            style="width: 100%" />
                    </a-form-item>
                </div>
            </a-form>

            <a-checkbox v-model:checked="taxApplicable">Áp dụng thuế</a-checkbox>
        </template>
    </Layout>
</template>

<style scoped>
.group {
    margin: 12px 0;
    width: 100%;
}

.error-message {
    color: red;
    margin-left: 4px;
}
</style>