<script setup>
import { ref, h, reactive, onMounted, watchEffect } from 'vue'
import { Input, Button, Select, Tag, Flex, Row, Col, Pagination } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import Layout from '@/layouts/Layout.vue'
import apiClient from '@/axios'
import showMessage from '@/assets/js/message'
import Text from '@/components/Text.vue'


const staffInfor = reactive({
  fullname: '',
  phone: '',
  email: '',
  status: null,
  id_role: null,
  address: '',
  password: ''
})

const page = reactive({
  current: 1,
  size: 5,
  totalValue: 0
})

let employees = reactive([])

const searchQuery = ref('')
const selectedRole = ref(null)
const selectedStatus = ref(null)
const selectedDate = ref('')

const getEmployee = async () => {
  try {
    const response = await apiClient.get("/auth/employee", {
      params: {
        search: searchQuery.value || undefined,
        role: selectedRole.value || undefined,
        status: selectedStatus.value || undefined,
        createdAt: selectedDate.value || undefined,
        page: page.current,
        limit: page.size
      }
    })
    employees.length = 0
    employees.push(...response.data)
    page.totalValue = response.data.length

  } catch (error) {
    showMessage('error', error)
  }
}


const handlePageChange = (newPage, newSize) => {
  page.current = newPage
  page.size = newSize
  getEmployee()
};


const isShowModal = ref(false)

const showModal = () => {
  isShowModal.value = true
}


const handleOk = async () => {
  try {
    const response = await apiClient.post("/auth/employee", JSON.stringify(staffInfor))
    if (response.status == 201) {
      showMessage('success', "Thêm nhân viên thành công")
      employees.push(response.data)
      isShowModal.value = false
    } else {
      showMessage('warning', response?.data)
    }
  } catch (error) {
    showMessage('error', error)
  }

}

const handleCancel = () => {
  isShowModal.value = false
}


const roles = ref([])
const getRoles = async () => {
  try {
    const roleResponse = await apiClient.get(`/roles`)
    roles.value = roleResponse.data
  } catch (error) {
    console.log(error)
  }
}

const columns = reactive([
  { title: 'Tên nhân viên', dataIndex: 'fullName', key: 'fullName' },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    customRender: ({ text }) => h(Tag, { color: text === 'working' ? 'green' : 'volcano' }, () => text)
  },
  {
    title: 'Vai trò',
    key: 'role',
    dataIndex: ['role', 'name']
  },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
  { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
  { title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at' }
])
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
}

watchEffect(() => {
  if (!searchQuery.value) getEmployee()
})
onMounted(() => {
  getEmployee()
  getRoles()
})

</script>

<template>
  <Layout>
    <template #nav>
      <Flex justify="end">
        <Button class="margin-left">Phân quyền vai trò</Button>
        <Button @click="showModal" class="margin-left" type="primary" :icon="h(PlusOutlined)">Thêm nhân viên
          khác</Button>
      </Flex>
    </template>
    <template #content>
      <div class="employee-management">

        <div class="top-bar">
          <Row>
            <Col flex="1 1 auto"><Input @keyup.enter="getEmployee" v-model:value="searchQuery"
              placeholder="Tìm kiếm theo email, số điện thoại, tên nhân viên"
              style="width: 600px; margin-right: 12px" />
            </Col>
            <Col flex="0 1 auto">
            <Select v-model:value="selectedRole" placeholder="Vai trò" style="margin-left: 3px; width: 150px;">
              <Select.Option value="">Tất cả</Select.Option>
              <Select.Option v-for="role in roles" :key="role.id" :value="role.name">
                {{ role.name }}
              </Select.Option>
            </Select>
            <Select v-model:value="selectedStatus" placeholder="Trạng thái" style="margin-left: 3px; width: 150px;">
              <Select.Option value="">Tất cả</Select.Option>
              <Select.Option value="0">Nghỉ việc</Select.Option>
              <Select.Option value="1">Đang làm việc</Select.Option>
            </Select>

            <Button @click="getEmployee" type="primary" style="margin-left: 12px">Lưu bộ lọc</Button>
            </Col>
          </Row>
        </div>

        <a-table :rowSelection="rowSelection" :dataSource="employees" :columns="columns" rowKey="id" :pagination="{
          total: page.totalValue,
          current: page.current,
          pageSize: page.size,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
          showTotal: (total) => `Tổng cộng ${total} nhân viên`,
          onChange: handlePageChange
        }" bordered>
          <template #bodyCell="{ text, column, record }">
            {{ text }}

          </template>
        </a-table>
        <a-modal style="width: 50%" v-model:open="isShowModal" title="Thêm nhân viên" @ok="handleOk"
          @cancel="handleCancel">
          <form @submit.prevent="handleOk">
            <div>
              <Text class="reset-margin" text="Tên nhân viên"></Text>
              <a-input v-model:value="staffInfor.fullname" class="a-input" placeholder="Tên nhân viên"></a-input>
            </div>
            <div>
              <Text class="reset-margin" text="Số điện thoại"></Text>
              <a-input v-model:value="staffInfor.phone" class="a-input" placeholder="Số điện thoại"></a-input>
            </div>
            <div>
              <Text class="reset-margin" text="Email"></Text>
              <a-input v-model:value="staffInfor.email" class="a-input" placeholder="Email"></a-input>
            </div>
            <div>
              <Text class="reset-margin" text="Địa chỉ"></Text>
              <a-input v-model:value="staffInfor.address" class="a-input" placeholder="Địa chỉ"></a-input>
            </div>
            <div>
              <Text class="reset-margin" text="Mật khẩu"></Text>
              <a-input v-model:value="staffInfor.password" type="password" class="a-input"
                placeholder="Mật khẩu"></a-input>
            </div>

            <div>
              <Text class="reset-margin" text="Trạng thái"></Text>
              <Select class="a-input" placeholder="Chọn trạng thái" v-model:value="staffInfor.status"
                style="width: 100%">
                <Select.Option :value="0">Nghỉ việc</Select.Option>
                <Select.Option :value="1">Đang làm việc</Select.Option>
              </Select>
            </div>
            <div>
              <Text class="reset-margin" text="Vai trò"></Text>
              <Select placeholder="Chọn vai trò" :value="secondCity"
                :options="roles.map(role => ({ label: role?.name, value: role?.id }))"
                v-model:value="staffInfor.id_role" style="width: 100%" />
            </div>
          </form>

        </a-modal>
      </div>
    </template>

  </Layout>
</template>

<style scoped>
.top-bar {
  margin-bottom: 15px
}



.margin-left {
  margin: 8px
}

.btn-auto {
  width: auto !important
}

.a-input {
  margin-bottom: 8px
}

.select {
  border-radius: 0 !important
}
</style>
