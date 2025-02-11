<script setup>
import apiClient from '@/axios';
const getData = async () => {
    try{
        const response = await apiClient.get("/auth/users")
        if (response.status == 200){
            console.log(response.data)
        }else{
            console.log("Khong the get data")
        }
    }catch{
        console.log("Khong the dang nhap")
    }
}
await getData()
</script>

<template>

    <p>home</p>
</template>