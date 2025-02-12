<script setup>
import { ref, h, reactive } from 'vue';
import { Input, Button, Select, Tag, Flex, Row } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import AntTable from '@/components/Ant/AntTable.vue';
import Layout from '@/layouts/Layout.vue';


const staffInfor = reactive({
    key: '',
    name: '',
    phone: '',
    email: '',
    status: '',
    role: '',
    createdAt: '',
    address: ''
  })

const employees = ref([
  {
    key: '1',
    name: 'Hương NT110',
    phone: '0339743434',
    email: 'huongnt110@pavcoun',
    status: 'Đang làm việc',
    role: 'Nhân viên',
    createdAt: '06/01/2023',
    address: '264-66, Phường Vĩnh Phúc, Quận...'
  },
  {
    key: '2',
    name: 'Diệu Linh Linh',
    phone: '0396813675',
    email: 'linh16081989@gmail.com',
    status: 'Đang làm việc',
    role: 'Chủ cửa hàng',
    createdAt: '06/12/2022',
    address: '...'
  }
]);

const columns = [
  { title: 'Tên nhân viên', dataIndex: 'name', key: 'name' },
  { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { 
    title: 'Trạng thái', dataIndex: 'status', key: 'status',
    customRender: ({ text }) => h(Tag, { color: 'green' }, () => text)
  },
  { title: 'Vai trò', dataIndex: 'role', key: 'role' },
  { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
];

const isShowModal = ref(false)

const showModal = () => {
  console.log("click show modal")
  isShowModal.value = true
}

const handleOk = () => {
  console.log(staffInfor)
  console.log('User clicked OK');
  isShowModal.value = false;
}

const handleCancel = () => {
  isShowModal.value = false
}


</script>

<template>
  <Layout>
    <template #nav>
      <Flex justify="end">
        <Button class="margin-left">Phân quyền vai trò</Button>
        <Button @click="showModal" class="margin-left" type="primary" :icon="h(PlusOutlined)">Thêm nhân viên khác</Button>
      </Flex>
    </template>
    <template #content>
      <div class="employee-management">
        
        <div class="top-bar">
          <Row>
            <Col flex="1 1 auto"><Input placeholder="Tìm kiếm theo email, số điện thoại, tên nhân viên" style="width: 700px; margin-right: 12px" /></Col>
            <Col flex="0 1 auto">
              <Select placeholder="Vai trò" style="margin-left: 3px">
              <Select.Option value="all">Tất cả</Select.Option>
              <Select.Option value="staff">Nhân viên</Select.Option>
              <Select.Option value="owner">Chủ cửa hàng</Select.Option>
              </Select>
              <Select placeholder="Trạng thái" style="margin-left: 3px">
                <Select.Option value="all">Tất cả</Select.Option>
                <Select.Option value="staff">Nhân viên</Select.Option>
                <Select.Option value="owner">Chủ cửa hàng</Select.Option>
              </Select>
              <Select placeholder="Ngày tạo" style="margin-left: 3px">
                <Select.Option value="all">Tất cả</Select.Option>
                <Select.Option value="staff">Nhân viên</Select.Option>
                <Select.Option value="owner">Chủ cửa hàng</Select.Option>
              </Select>
              <Button type="primary" style="margin-left: 12px;">Lưu bộ lọc</Button>
            </Col>
          </Row>
        </div>
        
        <AntTable :tableData="employees" :tableColumn="columns"/>
        <a-modal 
          v-model:open="isShowModal" 
          title="Thêm nhân viên"
          @ok="handleOk"
          @cancel="handleCancel"
        >
        <form @submit.prevent="handleOk">
          <a-input v-model:value="staffInfor.name" class="a-input" placeholder="Tên nhân viên"></a-input>
          <a-input v-model:value="staffInfor.phone" class="a-input" placeholder="Số điện thoại"></a-input>
          <a-input v-model:value="staffInfor.email" class="a-input" placeholder="Email"></a-input>
          <a-input v-model:value="staffInfor.status" class="a-input" placeholder="Trạng thái"></a-input>
          <a-input v-model:value="staffInfor.role" class="a-input" placeholder="Vai trò"></a-input>
        </form>

        </a-modal>
      </div>
    </template>
    
  </Layout>
</template>

<style scoped>
.top-bar{
  margin-bottom: 15px;
}
.margin-left{
  margin: 8px;
}
.btn-auto {
  width: auto !important;
}
.a-input{
  margin-bottom: 8px;
}

.select{
  border-radius: 0 !important;
}

</style>
