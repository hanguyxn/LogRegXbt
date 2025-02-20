<script setup>
import { ref, computed, onMounted } from "vue";
import { Modal, message } from "ant-design-vue";
import Layout from "@/layouts/Layout.vue";

const isModalVisible = ref(false);
const editForm = ref({
    name: "aaaaaaaaaaaa",
    email: "aaaaa",
    avatar: "aaaaaa",
});


</script>

<template>
    <Layout>
        <div class="profile-container">
            <h2>Hồ sơ cá nhân</h2>
            <div v-if="user" class="profile-card">
                <img :src="user.avatar || 'https://via.placeholder.com/100'" alt="Avatar" class="profile-avatar" />
                <h3>{{ user.name }}</h3>
                <p>Email: {{ user.email }}</p>
                <p>Vai trò: {{ user.role }}</p>
                <button @click="openEditModal">Chỉnh sửa</button>
            </div>
            <div v-else>
                <p>Đang tải dữ liệu...</p>
            </div>

            <!-- Modal chỉnh sửa -->
            <Modal v-model:visible="isModalVisible" title="Chỉnh sửa hồ sơ" @ok="handleUpdate">
                <div class="modal-content">
                    <label>Họ và Tên:</label>
                    <input v-model="editForm.name" type="text" placeholder="Nhập tên" />

                    <label>Email:</label>
                    <input v-model="editForm.email" type="email" placeholder="Nhập email" />

                    <label>Ảnh đại diện:</label>
                    <input type="file" @change="handleAvatarChange" />
                    <img v-if="editForm.avatar" :src="editForm.avatar" class="preview-avatar" />
                </div>
            </Modal>
        </div>
    </Layout>
</template>

<style scoped>
.profile-container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    text-align: center;
}

.profile-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
}

button {
    margin-top: 10px;
    padding: 10px;
    background: #1890ff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background: #40a9ff;
}

.modal-content {
    display: flex;
    flex-direction: column;
}

.modal-content input {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.preview-avatar {
    width: 80px;
    height: 80px;
    margin-top: 10px;
    border-radius: 50%;
    object-fit: cover;
}
</style>
