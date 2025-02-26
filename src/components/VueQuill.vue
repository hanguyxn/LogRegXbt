<script setup>
import { defineProps, defineEmits, watch } from "vue"
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css"

const props = defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue"])

watch(
    () => props.modelValue,
    (newValue) => {
        emit("update:modelValue", newValue)
    }
);
</script>

<template>
    <quill-editor :content="modelValue" contentType="html" theme="snow"
        @update:content="emit('update:modelValue', $event)" />
</template>
