<script setup>

import { Layout } from 'ant-design-vue';
import { Button } from 'ant-design-vue';
import AntMenu from '@/components/Ant/AntMenu.vue';
const { Header, Sider, Content, Footer } = Layout;
</script>

<template>
  <Layout style="min-height: 100vh">
    <Sider theme="light" collapsible>
      <div class="logo">v-app</div>
      <AntMenu/>
    </Sider>
    <Layout>
      <Header style="background: #fff; padding: 0 16px; font-weight: bold; display: flex; justify-content: space-between; align-items: center">
        <span>Quản lý hệ thống</span>
        <div>
          <router-link :to="{name: 'login'}">
            <Button>Đăng nhập</Button>
          </router-link>
          <router-link :to="{name: 'login'}">
            <Button type="primary" style="margin-left: 8px">Đăng ký</Button>
          </router-link>
        </div>
      </Header>
      <slot style="margin: 24px" name="nav"></slot>
      <Content style="margin: 16px">
        <div style="padding: 24px; background: #fff; min-height: 360px">
          <slot name="content"></slot>
        </div>
      </Content>
      <!-- <Footer style="text-align: center">
        Ant Design Vue ©2024 Created by .
      </Footer> -->
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
