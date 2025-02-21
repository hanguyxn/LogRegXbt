<script setup>

import { Layout } from 'ant-design-vue';
import { Button } from 'ant-design-vue';
import AntMenu from '@/components/Ant/AntMenu.vue';
const { Header, Sider, Content, Footer } = Layout;
import apiClient from '@/axios';
import showMessage from '@/assets/js/message';
import router from '@/router';
import { computed, onMounted } from 'vue';
import { useAuth } from '@/assets/js/auth/useAuth';
const { isAuthenticated, logout } = useAuth()


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
        <span>Quản lý hệ thống</span>
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
      </Header>
      <slot style="margin: 24px" name="nav"></slot>
      <Content style="margin: 16px">
        <div style="padding: 24px; background: #fff; min-height: 460px">
          <slot name="content"></slot>
        </div>
      </Content>
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
