<script setup>
import Layout from '@/layouts/Layout.vue'
import Text from '@/components/Text.vue'
import { Flex, message, Upload, Divider, Modal } from 'ant-design-vue'
import VueQuill from '@/components/VueQuill.vue'
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { watch, ref, reactive } from 'vue'
import apiClient from '@/axios'
import { useRoute, useRouter } from 'vue-router'
import showMessage from '@/assets/js/message'

const { Dragger } = Upload
const taxApplicable = ref(false)
const saveProductBtnLoading = ref(false)

const route = useRoute()
const router = useRouter()
const productId = ref(route.query.id)
const loading = ref(false)

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



const productDetail = reactive({
    id: '',
    name: '',
    skuCode: '',
    barCode: '',
    unit: '',
    branch: '',
    description: '',
    sellPrice: '',
    comparePrice: '',
    cost: '',
    quantity: '',
    image: '',
    file: null
})

// Giả lập lấy dữ liệu từ API
const fetchProductDetail = async () => {
    loading.value = true
    try {
        // Giả lập dữ liệu từ API
        const response = {
            data: {
                id: '1',
                name: 'trinh 1',
                skuCode: 'trinh 1',
                barCode: 'trinh 1',
                unit: 'VND',
                branch: 'GUCCI',
                description: '<p>trinh 1</p>',
                sellPrice: 2,
                comparePrice: 5,
                cost: 1,
                quantity: 1,
                image: 'http://res.cloudinary.com/dit9enk6m/image/upload/v1741072063/hzxryvmrvhkhnhllya0t.png',
                file: null
            }
        }
        Object.assign(productDetail, response.data)
        loading.value = false
    } catch (error) {
        message.error('Không thể tải thông tin sản phẩm')
        loading.value = false
    }
}

const handleSave = async () => {
    const formData = new FormData()
    if (imgFilePath.value) {
        formData.append('file', imgFilePath.value)
    }
    formData.append('name', productDetail.name)
    formData.append('sku_code', productDetail.skuCode)
    formData.append('bar_code', productDetail.barCode)
    formData.append('unit', productDetail.unit)
    formData.append('branch', productDetail.branch)
    formData.append('description', productDetail.description)
    formData.append('sell_price', productDetail.sellPrice)
    formData.append('compare_price', productDetail.comparePrice)
    formData.append('cost', productDetail.cost)
    formData.append('quantity', productDetail.quantity)

    try {
        await apiClient.put(`/products/${productId.value}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        message.success('Lưu thông tin sản phẩm thành công')
    } catch (error) {
        message.error('Không thể lưu thông tin sản phẩm')
    }
}

const handleDelete = () => {
    Modal.confirm({
        title: 'Cảnh báo',
        content: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
        okText: 'Xóa',
        okType: 'danger',
        cancelText: 'Hủy',
        onOk: async () => {
            try {
                await apiClient.delete(`/products/${productId.value}`)
                message.success('Xóa sản phẩm thành công')
                router.push('/products')
            } catch (error) {
                message.error('Không thể xóa sản phẩm')
            }
        }
    })
}

const handleExit = () => {
    router.push('/products')
}
watch(() => route.query.id, (newId) => {
    productId.value = newId
    fetchProductDetail()
})

fetchProductDetail()

</script>

<template>
    <Layout>
        <template #customHeader>
            <Flex gap="small" justify="end">
                <a-button @click="handleExit">
                    Thoát
                </a-button>
                <a-button type="primary" danger @click="handleDelete">
                    Xóa
                </a-button>
                <a-button :loading="saveProductBtnLoading" type="primary" @click="handleSave">
                    Lưu
                </a-button>


            </Flex>
        </template>

        <template #content>
            <Flex gap="small">
                <Text text="Chi tiết sản phẩm"></Text>
                <router-link :to="{ name: 'productVariant', query: { id: productId } }">
                    Xem biến thể
                </router-link>
            </Flex>
            <Divider orientation="left">Thông tin sản phẩm</Divider>
            <img :src="productDetail.image" alt="Product Image" class="product-image" />
            <div class="group">
                <Flex>
                    <Text text="Tên sản phẩm:" />
                    <p class="error-message">*</p>
                </Flex>

                <a-input v-model:value="productDetail.name" placeholder="Nhập tên sản phẩm" />
            </div>

            <Flex justify="space-between" gap="small">
                <div class="group">
                    <Text text="Mã SKU" />
                    <a-input v-model:value="productDetail.skuCode" placeholder="Nhập mã SKU" />
                </div>
                <div class="group">
                    <Text text="Mã vạch/barCode" />
                    <a-input v-model:value="productDetail.barCode" placeholder="Nhập mã vạch" />
                </div>
            </Flex>

            <div class="group">
                <Text text="Đơn vị tính" />
                <a-input v-model:value="productDetail.unit" placeholder="Nhập đơn vị tính" />
            </div>

            <div class="group">
                <Text text="Mô tả" />
                <VueQuill v-model="productDetail.description" />
            </div>


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
                    <a-input v-model:value="productDetail.sellPrice" suffix="₫" placeholder="0" />
                </div>
                <div class="group">
                    <Text text="Giá so sánh" />
                    <a-input v-model:value="productDetail.comparePrice" suffix="₫" placeholder="0" />
                </div>
            </Flex>

            <div class="group">
                <Text text="Giá vốn" />
                <a-input v-model:value="productDetail.cost" suffix="₫" placeholder="0" />
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

img {
    width: 100px;
    height: 100px;
    border: #ccc 3px solid;
    border-radius: 5px;
}
</style>