<script>
import child from './child.vue';
export default {
    data() {
        return {
            keyinfo: {
                name: "",
                phone: "",
                mail: "",
                address: "",
                school: "",
                male: "",
                female: "",
                habbit: "",
            },
            page: 1,
        }
    },
    methods: {
        ChangePage() {
            this.page = 2
        },
        BackPage() {
            this.page = 1
        },
    },
    components: {
        child
    }
}
</script>

<template>
    <div class="body">
        <div v-if="page == 1" class="show">
            <div class="keysm">
                <p for="">1.姓名</p>
                <input style="width: 300px;" type="text" v-model="keyinfo.name" placeholder="姓名">
            </div>
            <div class="keysm">
                <p for="">2.電話</p>
                <input style="width: 300px;" type="text" v-model="keyinfo.phone" placeholder="09XX-000-△△△">
            </div>
            <div class="keysm">
                <p for="">3.Email</p>
                <input style="width: 300px;" type="text" v-model="keyinfo.mail" placeholder="user@mail.com">
            </div>
            <div class="keysm">
                <p for="">4地址</p>
                <input style="width: 300px;" type="text" v-model="keyinfo.address" placeholder="key in your address">
            </div>
            <div class="keysm">
                <p for="">5.畢業學校</p>
                <input style="width: 300px;" type="text" v-model="keyinfo.school"
                    placeholder="where are you graduated from">
            </div>
            <div class="keysm">
                <div style="margin-right: 150px;">
                    <span>6.性別　　　</span>
                    <label for="">男</label>
                    <input type="radio" value="男生" v-model="keyinfo.male">
                    <label for="">女</label>
                    <input type="radio" value="女生" v-model="keyinfo.female">
                </div>
            </div>
            <div class="keysm">
                <p for="">7.興趣</p>
                <input style="width: 300px; height: 300px;" type="text" placeholder="input your habbit"
                    v-model="keyinfo.habbit">
            </div>
            <button type="button" @click="ChangePage()">確認註冊資訊</button>
        </div>
    </div>
    <div v-if="page == 2" class="show2">
        <child :checkinfo="keyinfo"/>
        

        <button style="margin-left: 46.8vw;" type="button" @click="BackPage()">返回上一頁</button>
    </div>
</template>

<style lang="scss" scoped>
.body {
    width: 100vw;
    display: flex;
    justify-content: center;

    .show {
        margin-top: 45px;
        width: 40vw;
        border: 1px solid;
        display: flex;
        flex-direction: column;
        background-color: #FFBB98;
        align-items: center;
        border-radius: 15px;

        .keysm {
            margin: 15px 0;

            input {
                border-radius: 2.5px;
            }
        }
    }
}
</style>