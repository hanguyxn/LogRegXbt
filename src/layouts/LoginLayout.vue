<script setup>

</script>

<template>
    <div class="container">
        <div class="left-layout">
            <slot></slot>
        </div>
        <div class="right-layout">
        </div>
    </div>
</template>

<style scoped>

.left-layout {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.right-layout{
    width: 100%;
    height: 100vh;
    background-color: aquamarine;
    background-image: url("../assets/login-background.png");
    background-repeat: no-repeat;
    background-size: cover;
    display: none;
}


@media (min-width: 780px) {

    .container{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .right-layout{
        display: block;
    }
}

</style>