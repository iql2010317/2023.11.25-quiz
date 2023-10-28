<script>
import { RouterLink, RouterView } from "vue-router";
export default {
    data() {
        return {

        }
    },
    components: {
        RouterLink,
        RouterView,
    }
}
</script>

<template>
    <div class="toshin">
        <div class="body">
            <div class="long">
            <RouterLink style="color: black; text-decoration: none;" to="/Vhouse/sagasu/toshin/Detail/A">
                <div class="logo"><img style="border-radius: 10px; width: 150px; height: 150px;" src="../../public/3.png" alt=""></div></RouterLink>
                <div class="detail">
                    <h2>都心区　A物件</h2>
                    <div class="br"></div>
                </div>
            </div>
            <div class="long">
                <RouterLink style="color: black; text-decoration: none;" to="/Vhouse/sagasu/toshin/Detail/B">
                <div class="logo"><img style="border-radius: 10px; width: 150px; height: 150px;" src="../../public/4.png" alt=""></div></RouterLink>
                <div class="detail">
                    <h2>都心区　B物件</h2>
                    <div class="br"></div>
                </div>
            </div>
            <div class="long">
                <RouterLink style="color: black; text-decoration: none;" to="/Vhouse/sagasu/toshin/Detail/C">
                <div class="logo"><img style="border-radius: 10px; width: 150px; height: 150px;" src="../../public/5.png" alt=""></div></RouterLink>
                <div class="detail">
                    <h2>都心区　C物件</h2>
                    <div class="br"></div>
                </div>
            </div>
            <div class="long">
                <RouterLink style="color: black; text-decoration: none;" to="/Vhouse/sagasu/toshin/Detail/D">
                <div class="logo"><img style="border-radius: 10px; width: 150px; height: 150px;" src="../../public/6.png" alt=""></div></RouterLink>
                <div class="detail">
                    <h2>都心区　D物件</h2>
                    <div class="br"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.toshin {
    width: 100vw;
    height: 100vh;
    background-color: #d7d6e9;
    display: flex;
    justify-content: center;
    .body{
        width: 60vw;
        height: 100vh;
        // border: 1px solid;
        display: flex;
        flex-direction: column;
        .long{
            width: 60vw;
            height: 25vh;
            // border: 1px solid;
            display: flex;
            align-items: center;
            .logo{
                width: 150px;
                height: 150px;
                background-color: #8e9dba;
                border-radius: 10px;
            }
            .detail{
                margin-left: 45px;
                width: 650px;
                height: 20vh;
                // border: 1px solid;
                .br{
                    width: 650px;
                    height: 1px;
                    border: 1px solid;
                }
            }
        }
    }
}
</style>