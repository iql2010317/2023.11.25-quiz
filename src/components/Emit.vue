<script>
import EmitChild from '../components/EmitChild.vue'
import EmitChild2 from '../components/EmitChild2.vue'
export default {
    data() {
        return {
            arr1: JSON.parse(localStorage.getItem("arr1")) || [],
            moneyText: {
                goods: "",
                money: "",
            },
            plusNum: 0,
            neNum: 0,
            totalNum: 0,
            showDialog: false,
        }
    },
    components: {
        EmitChild,
        EmitChild2,
    },
    methods: {
        addmoney(params) {
            // console.log(params)
            this.arr1.push(params); // Add the new transaction to the array
            localStorage.setItem("arr1", JSON.stringify(this.arr1));
            this.calthis(); // Recalculate
            // this.moneyText = { goods: "", money: "" }; // Clear input
        },
        updateCalData(calData) {
            this.plusNum = calData.plusNum;
            this.neNum = calData.neNum;
            this.totalNum = calData.totalNum;
        },
        calthis() {
            let income = 0;
            let expenses = 0;
            let totalMoney = 0;

            for (const item of this.arr1) {
                const moneyValue = parseFloat(item.money) || 0;
                if (moneyValue > 0) {
                    income += moneyValue;
                } else {
                    expenses += moneyValue;
                }
                totalMoney += moneyValue;
            }
            this.plusNum = income;
            this.neNum = expenses;
            this.totalNum = totalMoney;
        },
        handleDeleteTransaction() {
            // 处理删除事件
            this.arr1 = JSON.parse(localStorage.getItem("arr1")) || [];
            this.calthis();
        },
        ShowDialog() {
            this.showDialog = true;
        },

        closeDialog() {
            this.showDialog = false;
        },
    },

    created() {
        this.calthis();
    }
}
</script>

<template>
    <div class="body">
        <div class="mainbody">
            <h1>Emit Father</h1>
            <h2 :class="{ 'positive': totalNum > 0, 'negative': totalNum < 0 }">結餘: {{ totalNum }}</h2>
        </div>
        <div class="child1" v-if="showDialog">
            <div class="child1A">
                <EmitChild @add="addmoney" /> <!--子傳父-->
                <button @click="closeDialog">X</button>
            </div>
        </div>
        <div class="child2">
                <div class="child2Top">
                    <h2 :class="{ 'positive': plusNum > 0, 'negative': plusNum < 0 }">收入: {{ plusNum }}</h2>
                    <h2 :class="{ 'positive': neNum > 0, 'negative': neNum < 0 }">支出: {{ Math.abs(neNum) }}</h2>
                </div>
                <button @click="ShowDialog">新增交易</button>
            <EmitChild2 :getinfo2="arr1" @aizu2="updateCalData" @delete="handleDeleteTransaction" /> <!--父傳子-->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.body {
    width: 100vw;
    height: 80vh;
    display: flex;

    .positive {
        color: rgb(36, 149, 36);
    }

    .negative {
        color: rgb(209, 19, 19);
    }

    .mainbody {
        width: 50vw;
        height: 80vh;
        border-radius: 5px;
        background-color: #deab8a;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .child1 {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;

        .child1A {
            width: 500px;
            height: 500px;
            background-color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 30px;
            position: relative;
            font-size: 18pt;

            button {
                background-color: transparent;
                border: none;
                position: absolute;
                right: 30px;
                top: 20px;
            }
        }
    }

    .child2 {
        width: 50vw;
        height: 80vh;
        border-radius: 5px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 18pt;

        .child2Top {
            width: 100%;
            height: 200px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }
    }
}</style>
