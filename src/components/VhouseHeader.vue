<script>
import { RouterLink,RouterView } from "vue-router";
// import { RouterView } from "vue-router";
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
    <div class="VHH">
        <RouterLink to="/Vhouse/home">
            <div class="logo">
                <iframe style="height: 100%; width: 100%;" src="../../test04.html" frameborder="0"></iframe>
            </div>
        </RouterLink>
        <div class="moji">
            <div>会社案内</div>
            <div>|</div>
            <div>店舗・アクセス</div>
        </div>
        <div class="phone">
            <RouterLink to="/Vhouse/home"><i class="fa-solid fa-mobile-screen-button"></i></RouterLink>
            <span>010-123456789</span>
        </div>
        <div class="loginToi">
            <RouterLink to="/Vhouse/login">ログイン</RouterLink>
            <div>|</div>
            <RouterLink to="/Vhouse/toiawase">問い合わせ</RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.VHH {
    width: 100vw;
    height: 20vh;
    position: relative;
    display: flex;

    .loginToi {
        position: absolute;
        top: 45px;
        right: 70px;
        font-size: 16pt;
        display: flex;
        border: 1px solid;
        padding: 15px;
        border-radius: 5px;
        background-color: #8e9dba;
        color: white;

        a {
            text-decoration: none;
            color: white;
        }
    }

    .phone {
        position: absolute;
        top: 75px;
        left: 850px;
        font-size: 16pt;
    }

    .moji {
        width: 20vw;
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 75px;
        left: 250px;
        font-size: 16pt;
    }

    .logo {
        width: 100px;
        height: 100px;
        background-color: #8e9dba;
        position: absolute;
        top: 15px;
        left: 50px;
    }
}</style>