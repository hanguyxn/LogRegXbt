<script setup>
import { onMounted, reactive, ref } from 'vue';
import Layout2 from '@/layouts/Layout2.vue';
import apiClient from '@/axios';
import router from '@/router';
import showMessage from '@/assets/js/message';
import { Layout, Button, Row, Col, Flex, Upload, Divider } from 'ant-design-vue';
import Text from '@/components/Text.vue';
import Link from '@/components/Link.vue';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons-vue'
const { Dragger } = Upload

const taxApplicable = ref(false)

const data = reactive([
    {
        id: 1,
        color: "Xanh",
        title: "Ant Design Title 1",
    },
    {
        id: 2,
        color: "Đỏ",
        title: "Ant Design Title 2",
    },
    {
        id: 3,
        color: "Tím",
        title: "Ant Design Title 3",
    },
    {
        id: 4,
        color: "Vàng",
        title: "Ant Design Title 4",
    },
    {
        id: 5,
        color: "Hồng",
        title: "Ant Design Title 5",
    },
    {
        id: 6,
        color: "Cam",
        title: "Ant Design Title 6",
    },
    {
        id: 7,
        color: "Nâu",
        title: "Ant Design Title 7",
    },
    {
        id: 8,
        color: "Xám",
        title: "Ant Design Title 8",
    },
    {
        id: 9,
        color: "Lục",
        title: "Ant Design Title 9",
    }
]);

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
        propertiesImgPath.value = file
        return false
    },
    accept: "image/png, image/jpge, image/jpg"
})
</script>

<template>
    <Layout2>
        <template #sider>
            <div class="common back-to-product">
                <Flex gap="small">
                    <img src="http://res.cloudinary.com/dit9enk6m/image/upload/v1740645361/fwwyh5od6hq4hzba7p3d.png"
                        alt="">
                    <Flex justify="center" gap="small" :vertical="true">
                        <Text class="bold" text="t1"></Text>
                        <Text class="small" text="97 phiên bản"></Text>
                        <Link href="#" text="Trở lại sản phẩm" />
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
                                    <a-avatar shape="square" :size="48"
                                        :src="`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`" />
                                </template>
                                <template #title>
                                    <span style="font-size: 14px;">
                                        <a href="#" style="color: #1890ff;">{{ item.id }}</a> /
                                        <a href="#" style="color: #1890ff;">{{ item.color }}</a>
                                    </span>
                                </template>
                                <template #description>
                                    <span style="color: #999;">Tồn kho: -- | Có thể bán: --</span>
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
                            <a-input></a-input>
                        </div>

                        <div class="margin-bottom">
                            <Flex gap="small">
                                <Text class="small margin-bottom" text="Màu sắc"></Text>
                                <span class="error-message">*</span>
                            </Flex>
                            <a-input></a-input>
                        </div>
                        <div class="margin-bottom">
                            <Flex gap="small">
                                <Text class="small margin-bottom" text="Chất liệu"></Text>
                                <span class="error-message">*</span>
                            </Flex>
                            <a-input></a-input>
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
                <Divider orientation="left">Thông tin hiên bản</Divider>
                <Flex justify="space-between" gap="small">
                    <div class="group">
                        <Text class="small margin-bottom" text="Mã SKU" />
                        <a-input suffix="₫" placeholder="0" />
                    </div>
                    <div class="group">
                        <Text class="small margin-bottom" text="Mã vạch" />
                        <a-input suffix="₫" placeholder="0" />
                    </div>
                </Flex>

                <div class="group">
                    <Text class="small margin-bottom" text="Đơn vị tính" />
                    <a-input suffix="₫" placeholder="0" />
                </div>
            </div>
            <div class="common common2">
                <Divider orientation="left">Thông tin giá</Divider>
                <Flex justify="space-between" gap="small">
                    <div class="group">
                        <Text class="small margin-bottom" text="Giá bán" />
                        <a-input suffix="₫" placeholder="0" />
                    </div>
                    <div class="group">
                        <Text class="small margin-bottom" text="Giá so sánh" />
                        <a-input suffix="₫" placeholder="0" />
                    </div>
                </Flex>

                <div class="group">
                    <Text class="small margin-bottom" text="Giá vốn" />
                    <a-input suffix="₫" placeholder="0" />
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
    /* border-radius: 5px; */
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