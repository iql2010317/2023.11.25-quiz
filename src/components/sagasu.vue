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
    <div class="sagasu">
        <div class="mid">
            <RouterLink style="color: black; text-decoration: none;" to="/Vhouse/sagasu/toshin">
                <h1 style="margin-top: 25px;">都心区</h1>
            </RouterLink>
            <div class="br"></div>
            <div class="x4">
                <div class="area">
                    <div class="white"></div>
                    <span>千代田区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>千代田区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>千代田区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>千代田区</span>
                </div>
            </div>
            <div class="x4">
                <div class="area">
                    <div class="white"></div>
                    <span>六本木区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>六本木区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>六本木区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>六本木区</span>
                </div>
            </div>
            <div class="x4">
                <div class="area">
                    <div class="white"></div>
                    <span>秋葉原区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>秋葉原区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>秋葉原区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>秋葉原区</span>
                </div>
            </div>

            <h1 style="margin-top: 25px;">23区東部</h1>
            <div class="br"></div>
            <div class="x4">
                <div class="area">
                    <div class="white"></div>
                    <span>台場区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>台場区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>台場区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>台場区</span>
                </div>
            </div>
            <div class="x4">
                <div class="area">
                    <div class="white"></div>
                    <span>秋葉原区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>秋葉原区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>秋葉原区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>秋葉原区</span>
                </div>
            </div>

            <h1 style="margin-top: 25px;">23区西部</h1>
            <div class="br"></div>
            <div class="x4">
                <div class="area">
                    <div class="white"></div>
                    <span>千代田区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>千代田区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>千代田区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>千代田区</span>
                </div>
            </div>
            <div class="x4">
                <div class="area">
                    <div class="white"></div>
                    <span>六本木区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>六本木区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>六本木区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>六本木区</span>
                </div>
            </div>
            <div class="x4">
                <div class="area">
                    <div class="white"></div>
                    <span>秋葉原区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>秋葉原区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>秋葉原区</span>
                </div>
                <div class="area">
                    <div class="white"></div>
                    <span>秋葉原区</span>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.sagasu {
    width: 100vw;
    height: 100vh;
    background-color: #d7d6e9;
    display: flex;
    justify-content: center;

    .mid {
        width: 60vw;
        height: 100vh;
        // border: 1px solid;
        padding: 0 150px;

        .x4 {
            margin-top: 5px;
            width: 40vw;
            height: 7.5vh;
            // border: 1px solid;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .area {
                width: 8vw;
                height: 6vh;
                border: 1px solid;
                border-radius: 5px;
                background-color: #8e9dba;
                display: flex;
                align-items: center;

                .white {
                    width: 20px;
                    height: 20px;
                    background-color: white;
                    border-radius: 5px;
                    margin-left: 15px;
                }

                span {
                    margin-left: 20px;
                    color: white;
                }
            }
        }

        .br {
            width: 40vw;
            height: 1px;
            border: 1px solid;
        }
    }
}</style>
