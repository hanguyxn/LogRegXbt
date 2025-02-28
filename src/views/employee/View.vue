<script setup>
import { ref, h, reactive, onMounted, watchEffect } from 'vue'
import { Input, Button, Select, Tag, Flex, Row, Col, Pagination } from 'ant-design-vue'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons-vue'
import Layout from '@/layouts/Layout.vue'
import apiClient from '@/axios'
import showMessage from '@/assets/js/message'
import Text from '@/components/Text.vue'
import Loading from '@/components/Loading.vue'
import FilterSearch from '@/components/FilterSearch.vue'
const isLoading = ref(false)

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

const employees = reactive([
  {
    id: '1',
    fullName: 'Nguyễn Văn A',
    status: 'Đang làm việc',
    role: { id: "3", name: 'Quản lý' },
    email: 'nguyenvana@example.com',
    address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    phone: '0987654321',
    created_at: '2024-01-15'
  },
  {
    id: '2',
    fullName: 'Trần Thị B',
    status: 'Nghỉ phép',
    role: { id: "1", name: 'Nhân viên' },
    email: 'tranthib@example.com',
    address: '456 Đường Nguyễn Huệ, Quận 3, TP.HCM',
    phone: '0971234567',
    created_at: '2023-12-20'
  },
  {
    id: '3',
    fullName: 'Lê Văn C',
    status: 'Đang làm việc',
    role: { id: "2", name: 'Kế toán' },
    email: 'levanc@example.com',
    address: '789 Đường Trần Hưng Đạo, Quận 5, TP.HCM',
    phone: '0965678901',
    created_at: '2024-02-10'
  },
  {
    id: '4',
    fullName: 'Phạm Thị D',
    status: 'Đã nghỉ việc',
    role: { id: "1", name: 'Nhân viên' },
    email: 'phamthid@example.com',
    address: '159 Đường Điện Biên Phủ, Quận 10, TP.HCM',
    phone: '0952345678',
    created_at: '2023-09-05'
  }
]);

// const searchQuery = ref(null)
// const selectedRole = ref(null)
// const selectedStatus = ref(null)
// const selectedDate = ref('')

const employeeParams = reactive({
  search: null,
  role: null,
  status: null,
  createdAt: null,
})


const getEmployee = async () => {
  try {
    const response = await apiClient.get("/auth/employee", {
      params: {
        search: employeeParams.search || undefined,
        role: employeeParams.role || undefined,
        status: employeeParams.status || undefined,
        createdAt: employeeParams.createdAt || undefined,
        page: page.current,
        limit: page.size
      }
    })
    employees.length = 0
    employees.push(...response?.data?.listEmployee)
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


const roles = reactive([])
const getRoles = async () => {
  try {
    const roleResponse = await apiClient.get(`/roles`)
    roles.length = 0
    roles.push(...roleResponse.data)

    // console.log(roles.map(role => ({ value: role.id, label: role.name })))
  } catch (error) {
    console.log(error)
  }
}

const formatDate = (dateString) => new Intl.DateTimeFormat("vi-VN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  // hour: "2-digit",
  // minute: "2-digit",
  // second: "2-digit",
  timeZone: "Asia/Ho_Chi_Minh",
}).format(new Date(dateString))

const columns = reactive([
  {
    title: 'Tên nhân viên',
    dataIndex: 'fullName',
    key: 'fullName'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Vai trò',
    key: 'role',
    dataIndex: ['role', 'name']
  },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
  { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
  {
    title: 'Ngày tạo',
    dataIndex: 'created_at',
    key: 'created_at'
  }
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
  if (!employeeParams.search) getEmployee()
})
onMounted(() => {
  getEmployee()
  getRoles()
  // console.log(roles.value)
})

const filters = ref([
  {
    key: 'role',
    value: null,
    placeholder: 'Vai trò',
    options: roles.map(role => ({ value: role.id, label: role.name }))
  },
  {
    key: 'status',
    value: null,
    placeholder: 'Trạng thái',
    options: [
      { value: '1', label: 'Nghỉ việc' },
      { value: '0', label: 'Đang làm việc' }
    ]
  }
])


watchEffect(() => {
  filters.value = [
    {
      key: 'role',
      value: null,
      placeholder: 'Vai trò',
      options: roles.map(role => ({ value: role.id, label: role.name }))
    },
    {
      key: 'status',
      value: null,
      placeholder: 'Trạng thái',
      options: [
        { value: '0', label: 'Nghỉ việc' },
        { value: '1', label: 'Đang làm việc' }
      ]
    }
  ]
})


const handleSearch = ({ searchQuery, filters }) => {
  employeeParams.search = searchQuery
  employeeParams.role = filters.role
  employeeParams.status = filters.status
  getEmployee()
}
</script>

<template>
  <Layout>
    <template #nav>

      <Flex justify="end" style="width: auto; margin: 12px 12px 0 12px">
        <Button class="margin-left">Phân quyền vai trò</Button>
        <Button @click="showModal" class="margin-left" type="primary" :icon="h(PlusOutlined)">Thêm nhân viên
          khác</Button>
      </Flex>
    </template>
    <template #content>
      <Loading :loading="isLoading" />
      <div class="employee-management">

        <div class="top-bar">
          <FilterSearch :filters="filters" @search="handleSearch"
            searchPlaceholder="Tìm kiếm theo email, số điện thoại, tên nhân viên" />
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

            <template v-if="column.key === 'status'">
              <a-tag :color="record.status === 'working' ? 'green' : 'red'">
                {{ record.status === 'working' ? 'Đang làm việc' : 'Nghỉ việc' }}
              </a-tag>
            </template>
            <template v-else-if="column.key === 'fullName'">
              <router-link :to="{ name: 'EmployeeDetail', query: { id: record.id } }">
                {{ record.fullName }}
              </router-link>
            </template>
            <template v-else-if="column.key === 'created_at'">
              <p>{{ formatDate(record.created_at) }}</p>
            </template>
            <template v-else>
              {{ text }}
            </template>
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
                <Select.Option :value="0">Đang làm việc</Select.Option>
                <Select.Option :value="1">Nghỉ việc</Select.Option>
              </Select>
            </div>
            <div>
              <Text class="reset-margin" text="Vai trò"></Text>
              <Select placeholder="Chọn vai trò" :options="roles.map(role => ({ label: role?.name, value: role?.id }))"
                v-model:value="staffInfor.id_role" style="width: 100%" />
            </div>
          </form>

        </a-modal>
      </div>
    </template>

  </Layout>
</template>

<style scoped>
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
