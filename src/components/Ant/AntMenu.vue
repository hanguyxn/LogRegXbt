<script setup>
import { h, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu } from 'ant-design-vue'
import {
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  RiseOutlined,
  ApartmentOutlined
} from '@ant-design/icons-vue'

const route = useRoute()
const selectedKeys = ref([route.name])
const openKeys = ref([])


const menuMap = {
  employee: 'sub1',
  role: 'sub1',
}

watch(
  () => route.name,
  (newName) => {
    selectedKeys.value = [newName]


    if (menuMap[newName]) {
      openKeys.value = [menuMap[newName]]
    }
  },
  { immediate: true }
)
</script>

<template>
  <Menu mode="inline" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys">
    <Menu.Item key="home" :icon="h(HomeOutlined)">
      <router-link :to="{ name: 'home' }">Trang chủ</router-link>
    </Menu.Item>
    <Menu.Item key="products" :icon="h(AppstoreOutlined)">
      <router-link :to="{ name: 'products' }">Sản phẩm</router-link>
    </Menu.Item>
    <Menu.Item key="varian" :icon="h(ApartmentOutlined)">
      <router-link :to="{ name: 'productVarian' }">Biến thể</router-link>
    </Menu.Item>
    <!-- <Menu.SubMenu key="sub1" title="Quản lý" :icon="h(SettingOutlined)"> -->
    <Menu.Item key="employee" :icon="h(UserOutlined)">
      <router-link :to="{ name: 'employee' }">Nhân viên</router-link>
    </Menu.Item>
    <Menu.Item key="role" :icon="h(RiseOutlined)">
      <router-link :to="{ name: 'role' }">Vai trò</router-link>
    </Menu.Item>
    <!-- </Menu.SubMenu> -->
  </Menu>
</template>
