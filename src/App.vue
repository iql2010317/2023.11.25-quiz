<script setup>
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";

</script>

<template>
    <div class="appBody">
        <div class="topHeader">
            <Header />
        </div>
        <div class="hihi">
            <RouterView />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.appBody {
    display: flex;
    background-color: #f0f0f0;
}

</style>


