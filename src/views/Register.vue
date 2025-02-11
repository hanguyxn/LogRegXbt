<script setup>
import { reactive, computed, ref } from 'vue';
import LoginLayout from '../components/LoginLayout.vue'
import Input from "../components/Input.vue"
import Text from "../components/Text.vue"
import Button from "../components/Button.vue"
import Link from "../components/Link.vue"
import apiClient from '@/axios';

const formData = reactive({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
});


const errors = reactive({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: ""
});

const fullNameRegex = /^[A-Za-zÀ-ỹ\s]{6,50}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



const submitForm = async () => {
  try{
    errors.fullName = fullNameRegex.test(formData.fullName) ? "" : "Họ và tên không hợp lệ";
    errors.email = emailRegex.test(formData.email) ? "" : "Email không hợp lệ";
    errors.password = formData.password.length >= 6 ? "" : "Mật khẩu phải có ít nhất 6 ký tự";
    errors.confirmPassword = formData.password === formData.confirmPassword ? "" : "Mật khẩu và mật khẩu nhập lại không trùng khớp";

    if (errors.email || errors.password || errors.fullName || errors.confirmPassword) return;
  
    if (errors.email || errors.password) return;
    const response = await apiClient.post("/auth/register", JSON.stringify(formData))
    if (response.status == 201){
      router.push("/")
    }

  } catch (error) {
    console.log(error)
  }
}
const checkboxValue = ref(false);

computed(() => {
  console.log(checkboxValue.value)
})

</script>

<template>
    <LoginLayout>
    <div class="login">
        <img src="../assets/logo.svg" alt="">
        <Text class="larger-text" text="Chào mừng quay lại!" textType="larger"/>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <div class="flex">
                <Text text="Họ tên"/><span class="required-star">*</span>
            </div>
            <Input v-model="formData.fullName" type="text" placeholder="Tên hiển thị trong hệ thống" :required="true"/>
            <p class="error-message" v-if="errors.fullName">{{ errors.fullName }}</p>
        </div>
        <div class="form-group">
            <div class="flex">
                <Text text="Email"/><span class="required-star">*</span>
            </div>
            <Input v-model="formData.email" type="text" placeholder="Email đăng ký tài khoản" :required="true"/>
            <p class="error-message" v-if="errors.email">{{ errors.email }}</p>
        </div>
        <div class="form-group">
            <div class="flex">
              <Text text="Mật khẩu"/><span class="required-star">*</span>
            </div>
            <Input v-model="formData.password" type="text" placeholder="Nhập mật khẩu" :required="true"/>
            <p class="error-message" v-if="errors.password">{{ errors.password }}</p>
        </div>
        <div class="form-group">
            <div class="flex">
              <Text text="Nhập lại mật khẩu"/><span class="required-star">*</span>
            </div>
            <Input v-model="formData.confirmPassword" type="text" placeholder="Nhập lại mật khẩu" :required="true"/>
            <p class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
        </div>
        <div class="before-btn flex">
            <div class="flex">
              <Input v-model="checkboxValue" class="checkbox" type="checkbox" placeholder="Email"/><Text class="save-text" text="Đồng ý với điều khoản sử dụng của của XBEST"/>
            </div>
        </div>
        <Button :isDisable="!checkboxValue" type="submit" btnClass="btn btn-primary" text="Đăng ký"/>
        <div class="after-btn flex">
            <Text text="Bạn đã có tài khoản ?"/>
            <Link class="register" text="Đăng nhập" href="/login"></Link>
        </div>
        </form>
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
