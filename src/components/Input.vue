<script setup>
import { defineProps, defineEmits, ref } from 'vue';
const props = defineProps({
    type: String,
    placeholder: String,
    class: {
        type: String,
        default: "input"
    },
    required: {
        type: Boolean,
        default: false
    }
})


const emit = defineEmits(["inputValue"]);

const inputValue = ref("");

const updateInputValue = (e) => {
    inputValue.value = e.target.value;
    emit("inputValue", inputValue.value);
};
</script>

<template>
    <template v-if="props.type === 'checkbox' || props.type === 'radio'">
        <input @blur="updateInputValue" v-model="inputValue" :class="class" :type="type" :required="required">
    </template>
    <template v-else>
        <input @blur="updateInputValue" v-model="inputValue" :class="class" :type="type" :placeholder="placeholder"
            :required="required">
    </template>
</template>


<style scoped>
input {
    outline: none;
    border-radius: 8px;
}

.input {
    font-size: 14px;
    padding: 8px 16px;
    background-color: rgb(247, 247, 253);
    border: 1px solid rgb(206, 212, 218);
    height: 40px;
    width: 100%;
}

.input:focus {
    border: 1px solid #51a8a1 !important;
    box-shadow: 0 0 0 2px #cbe6e4;
}

.checkbox {
    color: #06f !important;
    width: 16px;
    height: 16px;
    border-color: #f4f4f4;
}

.checkbox:hover {
    cursor: pointer;
    border-color: #06f;
}
</style>