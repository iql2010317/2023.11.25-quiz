<script>
export default {
    //props 單一數據流 父傳子的單一方向
    //emit 子傳父的單一方向
    props: [
        "checkinfo",
    ],
    methods:{
        ok(){
            alert("註冊成功")
        }
    }
}
</script>

<template>
    <div class="body">
        <div class="textshow">
            <p style="text-align: center;">註冊帳號資料確認範圍</p>
            <!-- {{ this.checkinfo }} -->
            <div class="outsm">
                <label for="">1.姓名：</label>
                <p v-text="checkinfo.name"></p>
                <label for="">2.電話：</label>
                <p v-text="checkinfo.phone"></p>
                <label for="">3.Email:</label>
                <p v-text="checkinfo.mail"></p>
                <label for="">4.地址：</label>
                <p v-text="checkinfo.address"></p>
                <label for="">5.畢業學校：</label>
                <p v-text="checkinfo.school"></p>
                <label for="">6.性別：</label>
                <p v-text="checkinfo.male"></p>
                <p v-text="checkinfo.female"></p>
                <label for="">7.興趣：</label>
                <p v-text="checkinfo.habbit"></p>
                <button style="margin-left: 17.1vw;" v-on:click="ok()" type="button">確定註冊</button>
            </div>
        </div>
    </div>
</template>

<style>
.body {
    width: 100vw;
    display: flex;
    justify-content: center;
    .textshow {
        margin-top: 45px;
        width: 600px;
        height: 600px;
        border: 1px solid black;
        border-radius: 15px;
        background-color: #f6f4e8;
    }
}
</style>