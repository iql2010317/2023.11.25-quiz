<script>
export default {
    data() {
        return {

        }
    },
    inject: [
        "msg",
    ]
}
</script>

<template>
    <div class="wrap2">
        <div class="content1">
            <p>{{ msg }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrap2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    border: 1px solid;
    background-image: url('https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2022/01/16/1/15364011.jpg&x=0&y=0&sw=0&sh=0&exp=3600&w=930');
    background-repeat: repeat;
    background-size: 50px 50px;

    .content1 {
        width: 100px;
        height: 100px;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>