<script>
import { RouterLink } from "vue-router";
import { mapState, mapActions } from "pinia";
import indexState from "../Store/indexState";
export default {
    data() {
        return {
            adminName: '',
            adminPwd: '',
            adminRouter: false,
            openAdminLoginArea: false,
            loggedIn: false // 添加 loggedIn 状态
        }
    }
    ,
    components: {
        RouterLink,
    },
    computed: {
        ...mapState(indexState, ["location", "locationInfo"]),
    },

    mounted() {
        const adminLoggedIn = sessionStorage.getItem('adminLoggedIn');
        this.adminRouter = adminLoggedIn === 'true'; // 将字符串转换为布尔值
        this.loggedIn = adminLoggedIn === 'true'; // 根据 sessionStorage 设置 loggedIn 状态
    },
    methods: {
        ...mapActions(indexState, ["getLocation", "setLocation"]),

        adminLogin() {
            if (this.adminName && this.adminPwd) {
                if (this.adminName === 'admin' && this.adminPwd === 'admin123') {
                    sessionStorage.setItem('adminLoggedIn', true);
                    alert('開發者登入成功');
                    this.adminRouter = true; // 登录成功后直接设置 adminRouter 为 true
                    this.loggedIn = true; // 设置 loggedIn 为 true
                } else {
                    alert('登录失败，请检查用户名和密码');
                }
            } else {
                alert('请输入管理员名字和密码');
            }
        },

        adminLogout() {
            sessionStorage.removeItem('adminLoggedIn'); // 清除管理员登录状态
            this.adminRouter = false; // 关闭后台路由链接
            this.loggedIn = false; // 设置 loggedIn 为 false
            alert('開發者登出成功');
            this.$router.push('/')   //導回使用者前台 
            this.adminName = null;
            this.adminPwd = null;

        },
        openAndCloseAdminLogin() {
            this.openAdminLoginArea = !this.openAdminLoginArea; // 切换管理员登录区域的显示状态
        }


    }
};
</script>
<template>
    <!-- <p>{{ this.location }}</p> -->

    <div class="adminDevArea">

        <button @click="openAndCloseAdminLogin()">
            <i class="fa-solid fa-gear" style="margin-right: 10px;"></i>開發者設定</button>
        <div class="adminLogin" v-if="openAdminLoginArea">
            <input type="text" style="padding-left: 10px;" placeholder="key in admin name" v-model="adminName" v-if="!loggedIn">
            <input type="password" style="padding-left: 10px;" placeholder="key in admin password" v-model="adminPwd" v-if="!loggedIn">
            <div class="logButnArea">
                <button @click="adminLogin" v-if="!loggedIn">
                    <i class="fa-solid fa-right-to-bracket" style="margin-right: 10px;"></i>開發者登入</button>
                <button @click="adminLogout" v-if="loggedIn">
                    <i class="fa-solid fa-arrow-right-from-bracket" style="margin-right: 10px;"></i>開發者登出</button>
            </div>

            <div class="adminRouter" v-if="adminRouter">
                <router-link to="/" class="router-link-custom">前台</router-link>
                <router-link to="/questHome" class="router-link-custom">後台</router-link>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.adminDevArea {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    /* 居中内容 */

    button {
        margin-bottom: 10px;
        /* 按钮间距 */
        padding: 8px 12px;
        /* 按钮内边距 */
        background-color: #3498db;
        /* 按钮背景颜色 */
        color: white;
        /* 按钮文字颜色 */
        border: none;
        /* 去除边框 */
        border-radius: 5px;
        /* 圆角 */
        cursor: pointer;
        transition: background-color 0.3s ease;
        /* 过渡效果 */

        &:hover {
            background-color: #2980b9;
            /* 悬停时按钮背景颜色 */
        }
    }

    .adminLogin {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* 居中内容 */
        margin-top: 10px;
        /* 顶部间距 */

        input {
            margin-bottom: 10px;
            /* 输入框间距 */
            padding: 8px;
            /* 输入框内边距 */
            border: 1px solid #ccc;
            /* 输入框边框 */
            border-radius: 5px;
            /* 输入框圆角 */
            width: 200px;
            /* 输入框宽度 */
        }

        button {
            padding: 8px 12px;
            /* 按钮内边距 */
            background-color: #2ecc71;
            /* 按钮背景颜色 */
            color: white;
            /* 按钮文字颜色 */
            border: none;
            /* 去除边框 */
            border-radius: 5px;
            /* 圆角 */
            cursor: pointer;
            transition: background-color 0.3s ease;
            /* 过渡效果 */

            &:hover {
                background-color: #27ae60;
                /* 悬停时按钮背景颜色 */
            }
        }
    }

    .adminRouter {
        display: flex;
        justify-content: center;
        /* 内容居中 */
        margin-top: 10px;
        /* 顶部间距 */

        .router-link-custom {
            text-decoration: none;
            color: blue;
            transition: text-decoration-color 0.3s;
            border-bottom: 1px solid transparent;

            &:hover {
                text-decoration-color: blue;
                border-bottom: 1px solid blue;
            }
        }
    }
}

@media screen and (max-width: 992px) {

    .adminDevArea {
        width: 225px;
    }
}
</style>
