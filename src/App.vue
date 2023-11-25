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
.topHeader{
    height: 10vh;
}
</style>


