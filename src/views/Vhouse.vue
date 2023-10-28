<script>
import { RouterLink } from "vue-router";
import { RouterView } from "vue-router";
import VhouseHeader from "../components/VhouseHeader.vue"
export default {
    data() {
        return {

        }
    },
    components: {
        RouterLink,
        RouterView,
        VhouseHeader,
    }
}
</script>

<template>
    <div class="houseHeader">
        <VhouseHeader />
    </div>

    <RouterView />
</template>

<style lang="scss" scoped>
.houseHeader{
    position: sticky;
    top:0;
    z-index: 3;
    background-color: white;
}
</style>