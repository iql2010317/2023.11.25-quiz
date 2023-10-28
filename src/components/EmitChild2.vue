<script>
export default {
    props: [
        "getinfo2",
    ],

    emits: ["aizu2"],

    data() {
        return {
            arr1: JSON.parse(localStorage.getItem("arr1")) || [],
            // Initialize these variables
            income: 0,
            expenses: 0,
            totalMoney: 0,
            recalculate: true,
        };
    },
    methods: {
        calthis() {
            this.arr1 = JSON.parse(localStorage.getItem("arr1")) || [];
            this.income = 0; // Reset these variables
            this.expenses = 0;

            for (const item of this.arr1) {
                const moneyValue = parseFloat(item.money) || 0;
                if (moneyValue > 0) {
                    this.income += moneyValue;
                } else {
                    this.expenses += moneyValue;
                }
                this.totalMoney += moneyValue;
            }

            const result = {
                plusNum: this.income,
                neNum: this.expenses,
                totalNum: this.totalMoney,
            };

            this.$emit("aizu2", result);
        },
        deleteTransaction(index) {
            if (index >= 0 && index < this.arr1.length) {
                // 直接使用 JavaScript 的 splice 方法刪除交易
                this.arr1.splice(index, 1);
                localStorage.setItem("arr1", JSON.stringify(this.arr1));
                this.recalculate = true;

                // 使用 Vue.nextTick() 来确保 DOM 更新
                this.$nextTick(() => {
                    // 在 DOM 更新后重新计算
                    this.recalculate = true;
                });
            }
            location.reload();
        }


    },
    watch: {
        // Watch the recalculate flag
        recalculate: function (newVal) {
            if (newVal) {
                this.calthis();
                this.recalculate = false; // Reset the flag
            }
        },
    },
    created() {
        this.arr1 = JSON.parse(localStorage.getItem("arr1")) || [];
        this.calthis();
    }
};
</script>

<template>
    <div class="E2Area">
        <h1>Emit Child2</h1>
        <div class="Eacharea" v-for="(item, index) in getinfo2" :key="index">
            <span class="child2goods">{{ item.goods }}</span>
            <span :class="{ 'positive': item.money > 0, 'negative': item.money < 0 }" class="child2money">{{ Math.abs(item.money) }}</span>
            <button @click="deleteTransaction(index)">刪除</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.E2Area {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .positive {
        color: rgb(36, 149, 36);
    }

    .negative {
        color: rgb(209, 19, 19);
    }
    .Eacharea {
        margin-bottom: 8px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: calc(100% - 100px);
        height: 100px;
        border: 1px solid;
        border-radius: 15px;
    }
}
</style>