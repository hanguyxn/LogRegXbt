<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Layout2 from '@/layouts/Layout2.vue';
import apiClient from '@/axios';
import showMessage from '@/assets/js/message';
import { Layout, Button, Row, Col, Flex, Upload, Divider } from 'ant-design-vue';
import Text from '@/components/Text.vue';
import Link from '@/components/Link.vue';
import { InboxOutlined, PlusOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons-vue'
const { Dragger } = Upload

const route = useRoute()
const router = useRouter()
const productId = ref(route.query.id)

const taxApplicable = ref(false)
const isLoading = ref(false)

const variantForm = reactive({
    skuCode: '',
    barCode: '',
    unit: '',
    description: '',
    sellPrice: '',
    comparePrice: '',
    quantity: '',
    cost: '',
    branch: '',
    color: '',
    size: '',
    material: '',
    idProduct: productId.value,
    file: null
})

const data = ref([])

const fetchVariants = async () => {
    try {
        const response = await apiClient.get(`/products/varian/${productId.value}`)
        data.value = response.data
    } catch (error) {
        showMessage('error', 'Không thể tải dữ liệu phiên bản sản phẩm')
    }
}

onMounted(() => {
    fetchVariants()
})

const propertiesImgPath = ref(null)
const draggerProps = reactive({
    name: "file",
    multiple: false,
    beforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            showMessage('warning', 'File phải nhỏ hơn 2MB')
            return Upload.LIST_IGNORE
        }
        variantForm.file = file
        return false
    },
    accept: "image/png, image/jpeg, image/jpg"
})

const handleSubmit = async () => {
    isLoading.value = true
    const formData = new FormData()
    formData.append('file', variantForm.file)
    formData.append('skuCode', variantForm.skuCode)
    formData.append('barCode', variantForm.barCode)
    formData.append('unit', variantForm.unit)
    formData.append('description', variantForm.description)
    formData.append('sellPrice', variantForm.sellPrice)
    formData.append('comparePrice', variantForm.comparePrice)
    formData.append('quantity', variantForm.quantity)
    formData.append('cost', variantForm.cost)
    formData.append('branch', variantForm.branch)
    formData.append('color', variantForm.color)
    formData.append('size', variantForm.size)
    formData.append('material', variantForm.material)
    formData.append('idProduct', variantForm.idProduct)

    try {
        const response = await apiClient.post('/products/varian', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        showMessage('success', 'Tạo phiên bản sản phẩm thành công')
        data.value.push(response.data)
        // router.push('/products')
    } catch (error) {
        showMessage('error', 'Không thể tạo phiên bản sản phẩm')
    } finally {
        isLoading.value = false
    }
}


</script>

<template>
    <Layout2>
        <template #customHeader>
            <Flex gap="small">
                <a-button :loading="isLoading" type="primary" @click="handleSubmit">
                    Thêm biến thể
                </a-button>
            </Flex>
        </template>
        <template #sider>
            <div class="common back-to-product">
                <Flex gap="small">
                    <img src="http://res.cloudinary.com/dit9enk6m/image/upload/v1740645361/fwwyh5od6hq4hzba7p3d.png"
                        alt="Product Image">
                    <Flex justify="center" gap="small" :vertical="true">
                        <Text class="bold" text="t1"></Text>
                        <Text class="small" :text="`${data.length} phiên bản`"></Text>
                        <router-link :to="{ name: 'productDetail', query: { id: productId } }">
                            Trở lại sản phẩm
                        </router-link>

                    </Flex>
                </Flex>
            </div>
            <div class="common common1">
                <Text style="margin-bottom: 24px;" class="bold" text="Thuộc tính"></Text>
                <a-list item-layout="horizontal" :data-source="data">
                    <template #renderItem="{ item, index }">
                        <a-list-item>
                            <a-list-item-meta>
                                <template #avatar>
                                    <a-avatar shape="square" :size="48" :src="item.image" />
                                </template>
                                <template #title>
                                    <span style="font-size: 14px;">
                                        <a href="#" style="color: #1890ff;">{{ item.size.name }}</a> /
                                        <a href="#" style="color: #1890ff;">{{ item.color.name }}</a>
                                    </span>
                                </template>
                                <template #description>
                                    <span style="color: #999;">Tồn kho: {{ item.quantity }} | Có thể bán: {{
                                        item.quantity }}</span>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </template>
                </a-list>
            </div>
        </template>
        <template #main>
            <div class="common attribute">
                <Text style="margin-bottom: 24px;" class="bold" text="Thuộc tính"></Text>
                <Row :gutter="16">
                    <Col :span="12">
                    <Flex gap="small" :vertical="true">
                        <div class="margin-bottom">
                            <Flex gap="small">
                                <Text class="small margin-bottom" text="Kích thước"></Text>
                                <span class="error-message">*</span>
                            </Flex>
                            <a-input v-model:value="variantForm.size"></a-input>
                        </div>
                        <div class="margin-bottom">
                            <Flex gap="small">
                                <Text class="small margin-bottom" text="Màu sắc"></Text>
                                <span class="error-message">*</span>
                            </Flex>
                            <a-input v-model:value="variantForm.color"></a-input>
                        </div>
                        <div class="margin-bottom">
                            <Flex gap="small">
                                <Text class="small margin-bottom" text="Chất liệu"></Text>
                                <span class="error-message">*</span>
                            </Flex>
                            <a-input v-model:value="variantForm.material"></a-input>
                        </div>
                    </Flex>
                    </Col>
                    <Col :span="12">
                    <Dragger style="max-height: 150px" v-bind="draggerProps">
                        <p class="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p class="ant-upload-text">
                            <PlusOutlined />Nhấn hoặc kéo thả tập tin vào đây để tải lên
                        </p>
                    </Dragger>
                    </Col>
                </Row>
            </div>
            <div class="common common2">
                <Divider orientation="left">Thông tin phiên bản</Divider>
                <Flex justify="space-between" gap="small">
                    <div class="group">
                        <Text class="small margin-bottom" text="Mã SKU" />
                        <a-input v-model:value="variantForm.skuCode" placeholder="0" />
                    </div>
                    <div class="group">
                        <Text class="small margin-bottom" text="Mã vạch" />
                        <a-input v-model:value="variantForm.barCode" placeholder="0" />
                    </div>
                </Flex>
                <Flex justify="space-between" gap="small">
                    <div class="group">
                        <Text class="small margin-bottom" text="Đơn vị tính" />
                        <a-input v-model:value="variantForm.unit" placeholder="0" />
                    </div>
                    <div class="group">
                        <Text class="small margin-bottom" text="Số lượng" />
                        <a-input v-model:value="variantForm.quantity" placeholder="0" />
                    </div>
                </Flex>

            </div>
            <div class="common common2">
                <Divider orientation="left">Thông tin giá</Divider>
                <Flex justify="space-between" gap="small">
                    <div class="group">
                        <Text class="small margin-bottom" text="Giá bán" />
                        <a-input v-model:value="variantForm.sellPrice" suffix="₫" placeholder="0" />
                    </div>
                    <div class="group">
                        <Text class="small margin-bottom" text="Giá so sánh" />
                        <a-input v-model:value="variantForm.comparePrice" suffix="₫" placeholder="0" />
                    </div>
                </Flex>
                <div class="group">
                    <Text class="small margin-bottom" text="Giá vốn" />
                    <a-input v-model:value="variantForm.cost" suffix="₫" placeholder="0" />
                </div>
                <a-checkbox v-model:checked="taxApplicable">Áp dụng thuế</a-checkbox>
            </div>
        </template>
    </Layout2>
</template>

<style scoped>
.group {
    margin: 12px 0;
    width: 100%;
}

.margin-bottom {
    margin-bottom: 8px;
}

.common {
    background-color: #fff;
    padding: 24px;
    width: 100%;
}

.common1 {
    margin-top: 12px;
}

.common2 {
    margin: 12px 0px 0px 12px;
}

.back-to-product {
    margin-right: 12px;
}

.attribute {
    margin-left: 12px;
}

.back-to-product img {
    width: 100px;
    height: 100px;
    border: #ccc 3px solid;
    border-radius: 5px;
}
</style>