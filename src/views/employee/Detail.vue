<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '@/layouts/Layout.vue'
import Text from '@/components/Text.vue'
import { message, Modal, Select, Button, Flex } from 'ant-design-vue'
import { CloseOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons-vue'
import apiClient from '@/axios'

const route = useRoute()
const router = useRouter()
const userId = ref(route.query.id)
const loading = ref(false)
const roles = ref([])

const employeeDetail = reactive({
    id: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    id_role: '',
    status: ''
})

// Giả lập lấy dữ liệu từ API
const fetchEmployeeDetail = async () => {
    loading.value = true
    try {
        // Giả lập API call
        setTimeout(() => {
            const response = {
                data: {
                    id: '123',
                    fullName: 'Nguyễn Văn A',
                    email: 'nguyenvana@example.com',
                    phone: '0123456789',
                    address: '123 Đường ABC, Quận 1, TP.HCM',
                    id_role: 2,
                    status: 'working'
                }
            }
            Object.assign(employeeDetail, response.data)
            loading.value = false
        }, 1000)
    } catch (error) {
        message.error('Không thể tải thông tin nhân viên')
        loading.value = false
    }
}

// Giả lập lấy danh sách vai trò từ API
const fetchRoles = async () => {
    try {
        // TODO: Thay thế bằng API call thực tế
        const response = await apiClient.get('/roles')
        roles.value = response.data
    } catch (error) {
        message.error('Không thể tải danh sách vai trò')
    }
}

const handleSave = async () => {
    try {
        // TODO: Thay thế bằng API call thực tế để lưu thông tin nhân viên
        await apiClient.put(`/auth/employee/${userId.value}`, {
            role: employeeDetail.id_role
        })
        message.success('Lưu thông tin nhân viên thành công')
    } catch (error) {
        message.error('Không thể lưu thông tin nhân viên')
    }
}

const handleDelete = () => {
    Modal.confirm({
        title: 'Cảnh báo',
        content: 'Bạn có chắc chắn muốn xóa nhân viên này?',
        okText: 'Xóa',
        okType: 'danger',
        cancelText: 'Hủy',
        onOk: async () => {
            try {
                // TODO: Thêm API call xóa nhân viên
                await apiClient.delete(`/auth/employee/${userId.value}`)
                message.success('Xóa nhân viên thành công')
                router.push('/employee')
            } catch (error) {
                message.error('Không thể xóa nhân viên')
            }
        }
    })
}

const handleExit = () => {
    router.push('/employee')
}

watch(() => route.query.id, (newId) => {
    userId.value = newId
    fetchEmployeeDetail()
})


fetchEmployeeDetail()
fetchRoles()

</script>

<template>
    <Layout>
        <template #customHeader>
            <Flex gap="small">
                <a-button @click="handleExit">
                    Thoát
                </a-button>
                <a-button type="primary" danger @click="handleDelete">
                    Xóa
                </a-button>
                <a-button type="primary" @click="handleSave">
                    Lưu
                </a-button>
            </Flex>
        </template>
        <template #content>
            <a-card :loading="loading" class="employee-detail-card">
                <template #title>
                    <div class="flex justify-between items-center">
                        <h2 class="text-xl font-bold">Thông tin nhân viên</h2>
                    </div>
                </template>

                <div class="employee-detail">
                    <div class="detail-item">
                        <span class="label">Mã nhân viên:</span>
                        <span class="value">{{ employeeDetail.id }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Họ và tên:</span>
                        <span class="value">{{ employeeDetail.fullName }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Email:</span>
                        <span class="value">{{ employeeDetail.email }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Số điện thoại:</span>
                        <span class="value">{{ employeeDetail.phone }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Địa chỉ:</span>
                        <span class="value">{{ employeeDetail.address }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Trạng thái:</span>
                        <a-tag :color="employeeDetail.status === 'working' ? 'green' : 'red'">
                            {{ employeeDetail.status === 'working' ? 'Đang làm việc' : 'Đã nghỉ việc' }}
                        </a-tag>
                    </div>
                    <div class="detail-item">
                        <span class="label">Vai trò:</span>
                        <a-select v-model:value="employeeDetail.id_role" placeholder="Chọn vai trò"
                            style="width: 200px">
                            <a-select-option v-for="role in roles" :key="role.id" :value="role.id">
                                {{ role.name }}
                            </a-select-option>
                        </a-select>
                    </div>
                </div>
            </a-card>
        </template>
    </Layout>
</template>

<style scoped>
.employee-detail-card {
    margin: 20px;
}

.employee-detail {
    display: flex;
    flex-direction: column;
}

.detail-item {
    display: flex;
    margin-bottom: 10px;
}

.label {
    font-weight: bold;
    width: 150px;
}

.value {
    flex: 1;
}
</style>
