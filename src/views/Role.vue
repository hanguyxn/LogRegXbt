<script setup>
import { reactive, onMounted, h } from 'vue'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import Layout from '@/layouts/Layout.vue'
import { Flex } from 'ant-design-vue'
import apiClient from '@/axios'
import { ref } from 'vue';
import { Modal, Button } from 'ant-design-vue';
import showMessage from '@/assets/js/message'

const isModalOpen = ref(false);
const roleName = ref("")
const showModal = () => {
    isModalOpen.value = true;
};

const handleOk = () => {
    isModalOpen.value = false;
};

const handleCancel = () => {
    isModalOpen.value = false;
};
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
    },
    {
        title: "Chức năng",
        key: 'fn',
        dataIndex: ''
    }
]

const editRole = (roleId) => {
    console.log(roleId);

}

const deleteRole = (roleId) => {
    console.log(roleId);
}

const addRole = async () => {
    try {
        const response = await apiClient.post("/roles", JSON.stringify({
            "nameRole": roleName.value
        }))
        if (response.status == 201) {
            showMessage('success', response?.data?.message || 'Thêm role thành công')
            tableData.push(response.data)
            isModalOpen.value = false
            return
        }
        showMessage('warning', response?.data?.message || 'Thêm role thất bại')
    } catch (error) {
        showMessage('success', response?.data?.message || 'Thêm role thành công')
    }
}

</script>

<template>
    <Layout>
        <template #nav>
            <Modal title="Thêm vai trò" :open="isModalOpen" @ok="addRole" @cancel="handleCancel">
                <form @submit.prevent="addRole">
                    <a-input v-model:value="roleName" placeholder="Nhập tên vai trò"></a-input>
                </form>

            </Modal>
            <Flex justify="end">
                <a-button @click="showModal" type="primary" style="width: auto; margin: 12px 12px 0 12px"
                    :icon="h(PlusOutlined)">Thêm vai
                    trò</a-button>
            </Flex>
        </template>
        <template #content>
            <a-table :dataSource="tableData" :columns="columns" rowKey="id" bordered>
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key == 'fn'">
                        <a-button :icon="h(EditOutlined)" color="danger" @click="editRole(record.id)">
                            Sửa
                        </a-button>
                        <a-button class="margin" :icon="h(DeleteOutlined)" style="color: red;"
                            @click="deleteRole(record.id)">
                            Xóa
                        </a-button>
                    </template>
                </template>
            </a-table>
        </template>
    </Layout>
</template>


<style scoped>
.margin {
    margin-left: 12px;
}
</style>