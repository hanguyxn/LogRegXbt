<script setup>
import 'animate.css';

import Text from './Text.vue';
import Input from './Input.vue';
import Button from './Button.vue';
import { ref, watch, defineEmits, reactive } from 'vue';

const props = defineProps({
    modalTitle: String,
    isShow: {
        type: Boolean,
        default: false
    }
})
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const errorEmail = ref("")
const emit = defineEmits(["update:isShow", "modalInputValue"]);
const isShow = ref(false)
const isShowModal = ref(isShow)

const formData = reactive({
    email: ""
})


watch(() => props.isShow, (newValue) => {
    isShowModal.value = newValue
})

const closeModal = () => {
    isShowModal.value = false
    emit("update:isShow", false);
}


const formSubmit = () => {
    errorEmail.value = emailRegex.test(formData.email) ? "" : "Xin vui lòng hoàn thiện email";
    if ( errorEmail.value ) return

    alert(`Submit form, email: ${formData.email}`)
}

</script>


<template>
    <transition enter-active-class="animate__animated animate__fadeIn animate__fast">
        <div v-if="isShowModal" class="container flex">
            <div class="modal flex">
                <div class="modal-content">
                    <div class="modal-header flex">
                        <h2>Lấy lại mật khẩu</h2>
                        <div class="icon">
                            <p @click="closeModal" class="close-modal">x</p>
                        </div>
                    </div>
                    <hr>
                    <form @submit.prevent="formSubmit">
                        <div class="form-group">
                            <div class="modal-body">
                                <div class="input-label flex">
                                    <Text class="modal-text" text="Email:"/><span class="required-star">*</span>
                                </div>
                                <Input v-model="formData.email" type="text" placeholder="Nhập email tạo tài khoản" :required="true"/>
                                <span v-if="errorEmail" class="error-message">
                                    {{ errorEmail }}
                                </span>
                            </div>
                            <div class="modal-bottom flex">
                                <Button @click="closeModal" class="btn btn-outline default close-modal" text="Hủy bỏ"></Button>
                                <Button type="submit" class="btn btn-primary default" text="Gửi"></Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    
    </transition>
</template>


<style scoped>
.container{
    width: 100%;
    height: 100%;
    background-color: #00000074;
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
}
.animate__fadeIn {
    animation-duration: 0.3s !important; 
}
.modal{
    width: 625px;
    background-color: #fff;
    border-radius: 15px;
    padding: 20px 24px;
}
.modal-header{
    justify-content: space-between;
    padding-bottom: 20px;
}

.form-group{
    margin-top: 18px;
}

.modal-content{
    width: 100%;
    /* justify-items: center; */
    /* align-content: center; */
}
.modal-text{
    margin-bottom: 8px;
}
.default{
    width: auto;
    margin-left: 12px;
}
.btn-outline{
    height: 32px;
}

.modal-bottom{
    margin-top: 38px;
    justify-content: end;
}

.close-modal{
    cursor: pointer;
}



</style>