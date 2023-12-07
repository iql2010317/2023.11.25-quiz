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
        <RouterLink to="/questFrontHome">前台</RouterLink>
        <RouterLink to="/questHome">後台</RouterLink>
        <!-- <RouterLink to="/surveyTest1">vue-survey-builder</RouterLink> -->
    </nav>

    <!-- <p>{{ this.location }}</p> -->
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
    a {
        text-decoration: none;
        color: black;
    }
}
</style>
