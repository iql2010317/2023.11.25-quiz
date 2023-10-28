<script>
export default {
    data() {
        return {
            title: "cool",
            car: false,
            car2: false,
            house: 0,
            house2: 0,
            imgtext: "https://memeprod.s3.ap-northeast-1.amazonaws.com/user-wtf/1577550337187.jpg",
            imgtext2: "https://memeprod.s3.ap-northeast-1.amazonaws.com/user-wtf/1577550337187.jpg",
        }
    },
    methods: {
        print() {
            if (this.title == "cool") {
                console.log("XXXX")
            }
        },
        goway() {
            this.$router.push("/Vhouse/home")
        },
    }
}
</script>

<template>
    <!-- <h1 style="text-align: center;">Vif & Vshow</h1>

    <div style="margin-left: 45vw;"> -->
        <!--V-if-->
        <!-- <h1>V-if</h1>
        <p>小明有車</p>
        <input type="checkbox" name="checkbox" value="true" v-model="car">
        <p v-if="car">確實有車</p>
        <br> -->

        <!--V-show-->
        <!-- <h1>V-show</h1>
        <p>小明有車</p>
        <input type="checkbox" name="checkbox" value="true" v-model="car2">
        <p v-show="car2">確實有車</p> -->

        <!--V-if & V-else-->
        <!-- <h1>V-if & v-else</h1>
        <p>小明有房</p>
        <select name="select" v-model="house">
            <option value="1">1</option>
            <option value="2">2</option>
        </select>
        <p v-if="house == 1">普通的房子</p>
        <p v-if="house == 2">很大的房子</p>
        <p v-else>還好的房子</p>
        <p>--------------</p> -->

        <!--V-if & V-else-if & v-else-->
        <!-- <h1>V-if & v-else-if & v-else</h1>
        <p>小明有房</p>
        <select name="select" v-model="house2">
            <option value="-1">------</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
        </select>
        <p v-if="house2 == 0">有點爛的房子</p>
        <p v-else-if="house2 == 1">普通的房子</p>
        <p v-else-if="house2 == 2">讚的房子</p>
        <p v-else>你沒有房子</p>

        <p>--------------</p> -->

    <!-- </div> -->
    <!-- <h1>利用this.$router.push("/Url") 連結到指定路徑</h1>
    <button type="button" v-on:click="goway()">連結到指定路徑</button> -->
    <div class="body">
    <div class="Area1">
        <div>
            <span>第1張</span>
            <input type="radio" name="radio" v-model="imgtext" value="https://media.tenor.com/Hq-LsRWfiBQAAAAd/hanceo-%E8%B6%85%E7%B4%9A%E8%B3%BD%E4%BA%9E%E4%BA%BA.gif">
            <span>第2張</span>
            <input type="radio" name="radio" v-model="imgtext" value="https://media.tenor.com/KDAIkEehHbUAAAAC/%E9%96%83%E9%9B%BB%E4%BA%94%E9%80%A3%E9%9E%AD.gif">
            <span>第3張</span>
            <input type="radio" name="radio" v-model="imgtext" value="https://img.gifmagazine.net/gifmagazine/images/4010946/original.gif">
        </div>
        <img style="width: 500px; height: 300px;" :src="imgtext" alt="">
    </div>
    <div class="Area2">
        <h1 style="margin-top: 30px;">Tarrrr~tare(好像叫做韃靼牛肉的樣子)</h1>
        <div style="display: flex;">
            <span>A</span>
            <input type="radio" name="radio" v-model="imgtext2"
                value="https://upload.wikimedia.org/wikipedia/commons/d/db/Classic_steak_tartare.jpg">
            <span>B</span>
            <input type="radio" name="radio" v-model="imgtext2"
                value="https://snippetsofparis.com/wp-content/uploads/2021/10/IMG_1990-beef-tartare-720x720.jpg">
            <span>C</span>
            <input type="radio" name="radio" v-model="imgtext2"
                value="https://slowthecookdown.com/wp-content/uploads/2020/09/steak-tartare-1-500x375.jpg">
        </div>
        <div class="circle" style=" border: 1px solid;border-radius: 500px;  width: 500px; height: 500px; ">
            <img style=" padding: 15px; border-radius: 500px; width: 500px; height: 500px;" :src="imgtext2" alt="">
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>

.body{
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    .Area1{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .Area2{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}


.circle{
    overflow: hidden;
    img{
        transition: 0.7s ease;
        &:hover{
            scale: (1.2);
        }
        &:active{
            rotate: 1080deg;
        }
    }
}

</style>