<script>
import { RouterLink } from "vue-router";
import { mapState, mapActions } from "pinia";
import indexState from "../Store/indexState";
export default {
    components: {
        RouterLink,
    },
    computed: {
        ...mapState(indexState, ["location", "locationInfo"])
    },
    methods: {
        ...mapActions(indexState, ["getLocation", "setLocation"])
    }
};
</script>
<template>
    <nav class="topNav">
        <RouterLink to="/">首頁</RouterLink>
        <RouterLink to="/Emit">Emit</RouterLink>
        <RouterLink to="/ExpenseTracker">ExpenseTracker</RouterLink>
        <RouterLink to="/Vhouse/home">Vhouse</RouterLink>
        <RouterLink to="/props">props</RouterLink>
        <RouterLink to="/Vif&show">Vif&show</RouterLink>
        <RouterLink to="/ProvideAndInject">ProvideAndInject</RouterLink>
        <RouterLink to="/V50">Vpupu</RouterLink>
        <RouterLink to="/ARAM">ARAM</RouterLink>
        <RouterLink to="/iframe">iframe</RouterLink>
        <RouterLink to="/i2">i2</RouterLink>
        <!-- <p>{{ this.location }}</p> -->
    </nav>
</template>
<style lang="scss" scoped>
.topNav {
    height: 100%;
    background-color: #E8E7D2;
    font-size: 16pt;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    // opacity: 0;
    // transition: 0.5s;
    // &:hover{
    // opacity: 1;
    // }

    a {
        text-decoration: none;
        color: black;
    }
}
</style>
