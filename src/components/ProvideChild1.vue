<script>
import ProvideChild2 from "../components/ProvideChild2.vue"
export default {
    data() {
        return {

        }
    },
    components: {
        ProvideChild2
    }
}
</script>

<template>
    <div class="wrap1">
        <ProvideChild2 />
    </div>
</template>

<style lang="scss" scoped>
.wrap1{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 400px;
    border: 1px solid;
    z-index: 1;
    background-color: white;;
}

</style>