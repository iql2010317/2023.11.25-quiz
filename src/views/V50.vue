<script>
export default {
    data() {
        return {
            numArr: [],
        };
    },
    methods: {
        getRandomNumber() {

            let arr = [];
            for (let i = 0; i < 30; i++) {
                let ran = Math.floor(Math.random() * 1000);
                arr.push(ran)
            }
            this.numArr = arr
            // return Math.floor(Math.random() * 1000); // 根据需要设置范围
        },
    },
    created() {
        this.getRandomNumber()
    }
};
</script>
<template>
    <!-- <button type="button" @click="getRandomNumber()"> btn</button> -->
    <div class="pupuArea">
        <div class="pupu" v-for="item in numArr">
            <!-- <img :src="item" /> -->
            <img :src="'https://source.unsplash.com/random/?sig=' + item" />
        </div>
    </div>
</template>


<style lang="scss" scoped>

.pupuArea {
    width: 100%;
    margin: 0px auto;
    column-count: 5;
    /*欄數*/
    column-gap: 0px;

    /*每欄間隔*/
    .pupu {
        padding: 5px;
        box-sizing: border-box;
        margin: 0 auto 5px;
        break-inside: avoid;
        /*定義頁面、列或是區域發生中斷時的元素表現方式。 auto->元素中斷、acoid->元素不中斷*/

        img {
            width: 16vw;
            object-fit: cover;
            object-position: 50% 50%;
            border-radius: 50px;
        }
    }
}
</style>