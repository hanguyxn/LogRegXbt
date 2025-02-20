<script setup>
import { reactive, onMounted } from 'vue'
import Layout from '@/layouts/Layout.vue'
import apiClient from '@/axios'

const tableData = reactive([])

const getAllRole = async () => {
    try {
        const response = await apiClient.get('/roles')
        tableData.length = 0
        tableData.push(...response.data)
        console.log(response.data)
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu vai trò:", error)
    }
}


onMounted(getAllRole)

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Vai trò',
        dataIndex: 'name',
        key: 'name'
    }
]
</script>

<template>
    <Layout>
        <a-table :dataSource="tableData" :columns="columns" rowKey="id" bordered />
    </Layout>
</template>
