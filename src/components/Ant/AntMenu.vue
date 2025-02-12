<script setup>
import { h, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Menu } from 'ant-design-vue';
import {
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';

const route = useRoute();
const selectedKeys = ref([route.name]); // Lưu trạng thái key đang chọn

// Cập nhật selectedKeys khi route thay đổi
watch(() => route.name, (newName) => {
  selectedKeys.value = [newName];
});
</script>

<template>
  <Menu mode="inline" :selectedKeys="selectedKeys">
    <Menu.Item key="home" :icon="h(HomeOutlined)">
      <router-link :to="{ name: 'home' }">Trang chủ</router-link>
    </Menu.Item>
    <Menu.Item key="products" :icon="h(AppstoreOutlined)">
      <router-link :to="{ name: 'products' }">Sản phẩm</router-link>
    </Menu.Item>
    <Menu.Item key="staffs" :icon="h(UserOutlined)">
      <router-link :to="{name: 'staffs'}">Nhân viên</router-link>
    </Menu.Item>
    <!-- <Menu.SubMenu key="sub1" :title="'Cài đặt'" :icon="h(SettingOutlined)">
      <Menu.Item key="account">
        <router-link :to="{ name: 'account' }">Tài khoản</router-link>
      </Menu.Item>
      <Menu.Item key="system">
        <router-link :to="{ name: 'system' }">Hệ thống</router-link>
      </Menu.Item>
    </Menu.SubMenu> -->
  </Menu>
</template>
