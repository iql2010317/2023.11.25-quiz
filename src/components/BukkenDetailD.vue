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
                <div class="logo"><img style="border-radius: 10px; width: 250px;height: 250px;" src="../../public/6.png" alt=""></div>
                <div class="detail">
                    <h2>都心区　D物件</h2>
                    <div class="br"></div>
                </div>
            </div>
            <div class="Detail"></div>
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
        width: 800px;
        height: 100vh;
        // border: 1px solid;
        display: flex;
        flex-direction: column;
        align-items:center;
        .long{
            width: 100%;
            height: 40vh;
            // border: 1px solid;
            display: flex;
            align-items: center;
            .logo{
                width: 250px;
                height: 250px;
                background-color: #8e9dba;
                border-radius: 10px;
            }
            .detail{
                margin-left: 45px;
                width: 400px;
                height: 20vh;
                // border: 1px solid;
                .br{
                    width: 400px;
                    height: 1px;
                    border: 1px solid;
                }
            }
        }
        .Detail{
            width: 900px;
            height: 60vh;
            background-color: white;
        }
    }
}
</style>