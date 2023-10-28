<script>
import {RouterLink} from "vue-router";
import {RouterView} from "vue-router";
export default{
    data(){
        return{

        }
    },
    methods:{
        btn(){
            alert("登入成功")
        }
    },
    components:{
        RouterLink,
        RouterView,
    }
}
</script>

<template>
    <div class="cc">
        <div class="ccc">
            <h4>Email</h4>
            <input class="ci" type="text" placeholder="XXXXX@gmail.com">
            <h4>Password</h4>
            <input class="ci" type="password" placeholder="keyin your password">
            <div class="login">
                <input type="checkbox">
                <span>ログインを保持する</span>
                <span style="margin-left: 65px;">新規登録</span>
            </div>
            <button v-on:click="btn()" style="background-color:#8e9dba; border-radius: 5px; ">
                <RouterLink to="/Vhouse/login/PersonalPage">ログイン</RouterLink>
                </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cc {
    width: 100vw;
    height: 100vh;
    background-color: #d7d6e9;
    display: flex;
    justify-content: center;
    align-items: center;
    .ccc{
        padding-top: 200px;
        width: 600px;
        height: 600px;
        padding-left: 155px;

        .ci{
            width: 300px;
            border-radius: 5px;
        }
        button{
            margin-top: 30px;
            width: 150px;
            height: 45px;
            margin-left: 75px;
            a{
                text-decoration: none;
                color: white;
                font-size: 18pt;
            }
        }
    }
}
</style>