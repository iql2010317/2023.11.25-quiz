<script>
export default {
    emits: ["add"],

    data() {
        return {
            addmoney: {
                goods: "",
                money: "",
            },
        };
    },
    methods: {
        addTransaction() {
            const newTransaction = {
                goods: this.addmoney.goods,
                money: this.addmoney.money,
            };
            this.$emit("add", newTransaction);
            this.addmoney.goods = "";
            this.addmoney.money = "";
        },
    },
};
</script>

<template>
    <h1>Emit Child</h1>
    <div>
        <span>東西</span>
        <input type="text" v-model="addmoney.goods" placeholder="keyin goods" />
    </div>
    <div>
        <span>錢</span>
        <input type="text" v-model="addmoney.money" placeholder="keyin money" />
    </div>
    <button type="button" @click="addTransaction()">增加交易(利用$emit)</button>
</template>

<style lang="scss" scoped>


</style>
