<script setup>

import { Layout, Button, Row, Col } from 'ant-design-vue';
import AntMenu from '@/components/Ant/AntMenu.vue';
const { Header, Sider, Content } = Layout;
import { previousPageTitle } from '@/stores/navigation.js';
import router from "@/router/index.js"
import { computed, onMounted, useSlots } from 'vue';
import { useAuth } from '@/assets/js/auth/useAuth';
import { LeftOutlined } from '@ant-design/icons-vue'
const { isAuthenticated, logout } = useAuth()

const canGoBack = computed(() => window.history.length > 1);
const slots = useSlots()
const existCustomHeader = computed(() => {
    return slots.customHeader && slots.customHeader().length > 0;
})

const existSider = computed(() => {
    return slots.aside && slots.aside().length > 0;
})


const goBack = () => {
    router.go(-1)
};
</script>
<template>
    <Layout style="min-height: 100vh">
        <Sider theme="light" collapsible>
            <div class="logo">v-app</div>
            <AntMenu />
        </Sider>
        <Layout>
            <Header
                style="background: #fff; padding: 0 16px; font-weight: bold; display: flex; justify-content: space-between; align-items: center">
                <span style="margin-right: 8px; cursor: pointer;" v-if="canGoBack" @click="goBack">
                    <LeftOutlined /> Quay lại {{ previousPageTitle }}
                </span>
                <slot name="customHeader"></slot>

                <template v-if="!existCustomHeader">
                    <!-- <span>Quản lý hệ thống</span> -->
                    <div v-if="!isAuthenticated">
                        <router-link :to="{ name: 'login' }">
                            <Button>Đăng nhập</Button>
                        </router-link>
                        <router-link :to="{ name: 'register' }">
                            <Button type="primary" style="margin-left: 8px">Đăng ký</Button>
                        </router-link>
                    </div>
                    <div v-else>
                        <Button @click="logout">Đăng xuất</Button>
                    </div>
                </template>
            </Header>
            <slot style="margin: 24px;" name="nav"></slot>
            <Layout>
                <Content style="margin: 16px 32px !important">
                    <Row justify="space-around">
                        <Col :flex="2">
                        <slot name="sider"></slot>
                        </Col>
                        <Col :flex="4">
                        <slot name="main"></slot>
                        </Col>
                    </Row>
                    <!-- <slot name="content"></slot> -->
                </Content>
                <!-- <Sider v-if="existSider" theme="light" width="40%"
                    style="padding: 24px;background: #fff; margin: 16px 16px 16px 0">
                    <slot name="aside"></slot>
                </Sider> -->
            </Layout>
        </Layout>
    </Layout>
</template>

<style>
.logo {
    height: 32px;
    margin: 16px;
    font-weight: bold;
    text-align: center;
    font-size: 18px;
}
</style>
