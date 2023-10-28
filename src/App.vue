<script setup>
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";
</script>

<template>
    <div class="topHeader">
        <Header />
    </div>
    <div class="hihi">
        <RouterView />
    </div>
</template>

<style lang="scss" scoped>
.topHeader {
    width: 100vw;
    height: 12vh;
}
.hihi{
    width: 100vw;
    display: flex;
    flex-direction: column;
}
</style>
