<script></script>

<template>
    <div class="toiawase">
        <h1 style="text-align: center;">毛玻璃試作範圍</h1>
        <div class="pupu">
            <img style="width: 600px; height: 600px;"
                src="https://source.unsplash.com/random/?sig='33"
                alt="">
            <div class="momo"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.toiawase {
    width: 100vw;
    height: 100vh;
    background-color: #d7d6e9;
    position: relative;
    .momo {
        width: 200px;
        height: 200px;
        position: absolute;
        top: 150px;
        left: 775px;
        backdrop-filter: blur(5px);
        z-index: 1;
        transition: 0.7s ease-in;
        &:hover {
            backdrop-filter: blur(0px);
        }
    }

    .pupu {
        border: 1px solid;
        display: flex;
        justify-content: center;
    }

}</style>