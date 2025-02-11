<script setup>
import { reactive, ref,computed } from 'vue';

import LoginLayout from '../components/LoginLayout.vue'
import Input from "../components/Input.vue"
import Text from "../components/Text.vue"
import Button from "../components/Button.vue"
import Link from "../components/Link.vue"
import Modal from "../components/Modal.vue"
import apiClient from '@/axios';
import router from "../router/index.js"

const formData = reactive({
    email: "",
    password: ""
});

const errors = reactive({
    email: "",
    password: ""
});

const showModal = ref(false)

const validateEmail = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email) ? "" : "Email không hợp lệ";
});

const validatePassword = computed(() => {
    return formData.password.length >= 6 ? "" : "Mật khẩu phải có ít nhất 6 ký tự";
});


const forgotPassword = () => {
  showModal.value = true
}

const login = async () => {
  try {
    errors.email = validateEmail.value;
    errors.password = validatePassword.value;

    if (errors.email || errors.password) return;
    const response = await apiClient.post("/auth/login", JSON.stringify(formData))
    if (response.status == 201){
      router.push("/")
    }

  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
    <LoginLayout>
    <div class="login">
        <Modal v-model:isShow="showModal"/>
        <img src="../assets/logo.svg" alt="">
        <Text class="larger-text" text="Chào mừng quay lại!" textType="larger"/>
        <Text class="small-text" text="Hãy đăng nhập và khám phá bản thân ngay từ hôm nay" textType="small"/>
        <form @submit.prevent="login">
          <div class="form-group">
              <Text text="Email"/>
              <Input v-model="formData.email" type="text" placeholder="Email" :required="true"/>
              <p class="error-message" v-if="errors.email">{{ errors.email }}</p>
          </div>
          <div class="form-group">
              <Text text="Mật khẩu"/>
              <Input v-model="formData.password" type="text" placeholder="Mật khẩu" :required="true"/>
              <p class="error-message" v-if="errors.password">{{ errors.password }}</p>
          </div>
          <div class="before-btn flex">
              <div class="flex">
              <Input class="checkbox" type="checkbox" placeholder="Email"/><Text class="save-text" text="Lưu tài khoản"/>
              </div>
              <Link @click="forgotPassword" text="Quên mật khẩu"/>
          </div>
          <Button type="submit" btnClass="btn btn-primary" text="Đăng nhập"/>
          <div class="after-btn flex">
              <Text text="Bạn chưa có tài khoản ?"/>
              <Link class="register" text="Đăng ký" href="/register"></Link>
          </div>
        </form>

        <div class="line-text">
        <Text text="Đăng nhập với"/>
        </div>
        <a href="#"><Button btnClass="btn btn-outline" text="Google"><img src="https://khungnangluc.com/assets/google-e667d2f2.svg" alt=""></Button></a>
    </div>
    </LoginLayout>

</template>

<style scoped>
.login{
  min-width: 60%;
}

.login > img{
  margin-bottom: 16px;
}
.larger-text{
  margin-bottom: 8px;
}
.small-text{
  margin-bottom: 32px;
}

.form-group,
.after-btn{
  margin-top: 24px;
}

.form-group > Input{
  margin-top: 8px;
}

.after-btn .register{
  margin-left: 8px;
}

Button{
  margin-top: 16px;
}

.flex{
  display: flex;
}

.before-btn{
  margin-top:  1.5rem;
  justify-content: space-between;
}

.before-btn .save-text{
  margin-left: .5rem;
}

.line-text {
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: bold;
    margin: 48px;
}
.line-text::before,
.line-text::after {
    content: "";
    flex-grow: 1;
    height: 1.5px;
    background-color: #ccc;
    margin: 0 15px;
    opacity: 0.3;
}

</style>
