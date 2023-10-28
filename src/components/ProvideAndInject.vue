<script>
import ProvideChild1 from "../components/ProvideChild1.vue"
export default {
    data() {
        return {
            dataMsg: "幫我傳承下去",
        }
    },
    components: {
        ProvideChild1
    },
    provide() {
        return {
            msg: this.dataMsg,
        }
    }
}
</script>

<template>
    <div class="body">
        <div class="wrap">
            <div class="content">
                <p>這是爺爺的訊息 dataMsg:{{ this.dataMsg }}</p>
            </div>
            <ProvideChild1 />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.body {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    height: 600px;
    border: 1px solid;
    background-image: url('https://obs.line-scdn.net/0h8Uc38TN0Z3peSnUqGoAYLWYcawttLH1zfCp6G3tOaUInZiQtN3s0GStMO1YgL3IufnggGX5KbhlwKnN8NQ/w644');
    background-repeat: repeat;
    background-size: 100px 100px;

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 398px;
        height: 100px;
        color: transparent;

        &:hover {
            cursor: pointer;
        }
        &:active{
            color: red;
            font-size: 16pt;
            font-weight: bold;
            background-color: white;
        }
    }

}
</style>