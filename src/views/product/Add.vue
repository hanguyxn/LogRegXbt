<script setup>
import Layout from '@/layouts/Layout.vue'
import Text from '@/components/Text.vue'
import { Flex, message, Upload, Divider, Space, Tag } from 'ant-design-vue'
import VueQuill from '@/components/VueQuill.vue'
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { watch, ref } from 'vue'
const { Dragger } = Upload
const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
        const { status } = info.file
        if (status !== 'uploading') {
            console.log(info.file, info.fileList)
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`)
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files)
    },
}


const content = ref("")
const taxApplicable = ref(false)
// watch(content, (newValue) => {
//     console.log(newValue)
// })
// watch(taxApplicable, (newValue) => {
//     console.log("taxApplicable", newValue)
// })

const columns = [
    {
        title: "Tên thuộc tính",
        dataIndex: "attributeName",
        key: "attributeName",
        width: "30%",
    },
    {
        title: "Giá trị",
        dataIndex: "value",
        key: "value",
        width: "60%",
    }
];

const data = ref([
    {
        key: "1",
        attributeName: "",
        tags: [],
    },
    {
        key: "2",
        attributeName: "",
        tags: [],
    },
    {
        key: "3",
        attributeName: "",
        tags: [],
    },
]);


//thuoc tinh san pham
const tags = ref([])
const inputValue = ref()

const tagEnter = () => {
    if (inputValue.value && !tags.value.includes(inputValue.value)) {
        tags.value.push(inputValue.value)
    }
    inputValue.value = ""
    console.log(tags.value)
}

</script>

<template>
    <Layout>
        <template #customHeader>
            <Flex gap="small" justify="end">
                <router-link :to="{ name: 'products' }">
                    <a-button color="primary" variant="outlined">Hủy</a-button>
                </router-link>
                <div>
                    <a-button :disabled="true">Thêm sản phẩm</a-button>
                </div>
            </Flex>
        </template>
        <template #content>
            <Text text="Thêm sản phẩm" class="larger"></Text>
            <Divider orientation="left" style="font-size: 32px; font-weight: bold;">Thông tin sản phẩm</Divider>
            <div class="group">
                <Flex gap="small">
                    <Text text="Tên sản phẩm:"></Text>
                    <p class="error-message">*</p>
                </Flex>
            </div>

            <a-input placeholder="Nhập tên sản phẩm"></a-input>
            <Flex justify="space-between" gap="small">
                <div class="group">
                    <Text style="margin-bottom: 8px" text="Mã SKU"></Text>
                    <a-input placeholder="Nhập mã SKU sản phẩm"></a-input>
                </div>
                <div class="group">
                    <Text style="margin-bottom: 8px" text="Mã vạch/Barcode"></Text>
                    <a-input placeholder="Nhập mã vạch sản phẩm (tối đa 50 kí tự)"></a-input>
                </div>
            </Flex>
            <div class="group">
                <Text style="margin-bottom: 8px" text="Đơn vị tính"></Text>
                <a-input placeholder="Nhập đơn vị tính"></a-input>
            </div>
            <div class="group">
                <Text style="margin-bottom: 8px" text="Mô tả"></Text>
                <VueQuill v-model="content"></VueQuill>
            </div>
            <div>
                <!-- thuộc tính sản phẩm -->
                <Divider orientation="left" style="font-size: 32px; font-weight: bold;">Thuộc tính sản phẩm</Divider>
                <a-table :columns="columns" :dataSource="data" :pagination="false">
                    <template #bodyCell="{ text, column, record }">
                        <template v-if="column.key === 'attributeName'">
                            <a-input v-model:value="record.attributeName" placeholder="Tên thuộc tính"></a-input>
                        </template>
                        <template v-else>
                            <Flex gap="small">
                                <a-select v-model:value="record.tags" mode="tags" placeholder="Nhập ký tự và ấn enter"
                                    style="width: 100%; " @change="tagEnter" />
                                <a-button type="text" @click="record.tags = []">
                                    <DeleteOutlined />
                                </a-button>
                            </Flex>
                        </template>
                    </template>

                </a-table>
            </div>
        </template>
        <template #aside>
            <div class="group">
                <Divider orientation="left" style="font-size: 32px; font-weight: bold;">Ảnh sản phẩm</Divider>
                <Dragger style="max-height: 160px" v-bind="props">
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Nhấn hoặc kéo thả tập tin vào đây để tải lên</p>
                    <p className="ant-upload-hint">(Dung lượng tối đa 2MB)</p>
                </Dragger>
            </div>
            <Divider orientation="left" style="font-size: 32px; font-weight: bold;">Thông tin giá</Divider>
            <Flex justify="space-between" gap="small">
                <div class="group">
                    <Text style="margin-bottom: 8px" text="Giá bán"></Text>
                    <a-input suffix="₫" placeholder="0" value="0"></a-input>
                </div>
                <div class="group">
                    <Text style="margin-bottom: 8px" text="Giá so sánh"></Text>
                    <a-input suffix="₫" placeholder="0" value="0"></a-input>
                </div>
            </Flex>
            <div class="group">
                <Text style="margin-bottom: 8px" text="Giá vốn"></Text>
                <a-input suffix="₫" placeholder="0" value="0"></a-input>
            </div>
            <a-checkbox v-model:checked="taxApplicable">Áp dụng thuế</a-checkbox>
        </template>
    </Layout>
</template>

<style scoped>
.group {
    margin: 12px 0;
    width: 100%
}
</style>