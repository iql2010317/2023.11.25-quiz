<script>
</script>

<template>
    <div class="PersonalPage">
        <div class="area">
            <div>お気に入り物件</div>
            <div>お気に入りタッグ</div>
            <div>ユーザー設定</div>
            <div>XXXXXXX</div>
            <div>ooooooo</div>
            <div>お問い合わせ履歴</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.PersonalPage {
    widows: 100vw;
    height: 100vh;
    background-color: #d7d6e9;
    display: flex;
    justify-content: center;
    align-items: center;
    .area {
        display: flex;
        flex-wrap: wrap;
        width: 60vw;
        height: 60vh;
        // border: 1px solid;
        div {
            width: 250px;
            height: 150px;
            border: 1px solid;
            border-radius: 15px;
            margin-left: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #8e9dba;
            color: white;
            font-size: 16pt;
        }
    }
}
</style>