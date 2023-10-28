<script>
export default {
    data() {
        return {
            plusNum: 0,
            neNum: 0,
            totalNum: 0,
            arr: JSON.parse(localStorage.getItem("arr")) || [],
            inputName: "",
            inputMoney: "",
            showDialog: false,
            showDeleteDialog: false,
            deleteIndex: null,
        };
    },
    methods: {
        updateTotals() {

            this.plusNum = this.arr.reduce(
                (total, item) =>
                    parseFloat(item.money) > 0 ? total + parseFloat(item.money) : total,
                0
            );
            this.neNum = this.arr.reduce(
                (total, item) =>
                    parseFloat(item.money) < 0 ? total + parseFloat(item.money) : total,
                0
            );
            this.totalNum = this.arr.reduce(
                (total, item) => total + parseFloat(item.money),
                0
            );
        },

        saveTransaction() {
            const name = this.inputName;
            const money = parseFloat(this.inputMoney);
            if (!isNaN(money)) {
                const EachSpend = {
                    name: name,
                    money: money,
                };
                this.arr.push(EachSpend);
                this.inputName = "";
                this.inputMoney = "";
                this.updateTotals();
                localStorage.setItem("arr", JSON.stringify(this.arr));
            }
        },

        ShowDialog() {
            this.showDialog = true;
        },

        closeDialog() {
            this.showDialog = false;
        },

        deleteTransaction(index) {
            this.arr.splice(index, 1);
            this.updateTotals();
            localStorage.setItem("arr", JSON.stringify(this.arr));
        },

        showDeleteConfirmation(index) {
            this.showDeleteDialog = true;
            this.deleteIndex = index;
        },

        confirmDeleteTransaction() {
            if (this.deleteIndex !== null) {
                this.deleteTransaction(this.deleteIndex);
                this.deleteIndex = null;
            }
            this.showDeleteDialog = false;
        },

        cancelDeleteTransaction() {
            this.showDeleteDialog = false;
            this.deleteIndex = null;
        },
    },

    created() {
        const transactions = JSON.parse(localStorage.getItem("arr"));
        if (transactions) {
            this.arr = transactions;
            this.updateTotals();
        }
    },

    components: {
    },
};
</script>

<template>
    <div class="bgArea">
        <div class="blueArea">
            <div class="dialog-wrapper1" v-if="showDialog">
                <div class="dialog1">
                    <p>Name</p>
                    <input v-model="inputName" type="text" placeholder="Name" />
                    <p>Money</p>
                    <input v-model="inputMoney" type="number" placeholder="Money" /><br>
                    <div class="btnSep">
                        <button type="button" @click="saveTransaction">Save Transaction</button>
                        <button style="user-select: none;" class="tyty" @click="closeDialog">X</button>
                    </div>
                </div>
            </div>

            <div class="dialog-wrapper2" v-if="showDeleteDialog">
                <div class="dialog">
                    <p>Sure to Delete?</p>
                    <div class="btnSep">
                        <button type="button" @click="confirmDeleteTransaction">Yes</button>
                        <button @click="cancelDeleteTransaction">No</button>
                    </div>
                </div>
            </div>
            <div class="headLeft">
                <h1 class="title change">Expense Tracker</h1>
                <h2 class="change">GyoKuSho</h2>
            </div>
            <div class="headRight">
                <h2 class="change">Your Balance</h2>
                <h1 :class="{ 'positive': totalNum > 0, 'negative': totalNum < 0 }">${{ totalNum }}</h1>
            </div>
            <h1 class="change">感謝彥勳大　無私教學與分享資源~</h1>
        </div>
        <div class="whiteArea">
            <div class="top">
                <div class="topLeft">
                    <h1>INCOME</h1>
                    <h1>${{ plusNum }}</h1>
                </div>
                <div class="topRight">
                    <h1>EXPENSE</h1>
                    <h1>${{ neNum }}</h1>
                </div>
            </div>
            <div class="btn">
                <button type="button" class="numBtn" v-on:click="ShowDialog">
                    Add transaction
                </button>
            </div>

            <div class="content">
                <div class="block" v-for="(item, index) in arr" :key="index">
                    <span>{{ index + 1 }}.　{{ item.name }}</span>
                    <div class="haha">
                        <span :class="{ 'positive': item.money > 0, 'negative': item.money < 0 }">{{ item.money }}</span>
                        <button @click="showDeleteConfirmation(index)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bgArea {
    width: 100%;
    height: 85vh;
    display: flex;

    .positive {
        color: rgb(36, 149, 36);
    }

    .negative {
        color: rgb(209, 19, 19);
    }

    .blueArea {
        // width: 40vw;
        background-color: #be758c;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;

        // .headLeft {

        // }

        .dialog-wrapper1 {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(0, 0, 0, 0.5); //000為黑 不透明度為0.5
            z-index: 999;
        }

        .dialog1 {
            width: 600px;
            height: 400px;
            background: white;
            color: #be758c;
            text-align: left;
            padding: 50px 100px;
            border-radius: 20px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

            .btnSep {
                margin-top: 20px;
                width: 100%;
                display: flex;
                justify-content: center;
                position: relative;

                .tyty {
                    background-color: #fff;
                    color: #be758c;
                    font-size: 25pt;
                    border: 0px;
                    position: absolute;
                    right: -70px;
                    bottom: 220px;
                }

                button {
                    padding: 15px;
                    font-size: 18pt;
                    border-radius: 8px;
                    background-color: #be758c;
                    color: white;
                }
            }

            p {
                font-size: 18pt;
            }

            input {
                border: 2px solid #be758c;
                border-radius: 15px;
                width: 100%;
                height: 40px;
            }
        }

        .dialog-wrapper2 {
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
        }

        .dialog {
            width: 600px;
            height: 400px;
            background: white;
            color: #be758c;
            text-align: left;
            padding: 0 100px;
            border-radius: 20px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

            .btnSep {
                margin-top: 20px;
                width: 100%;
                display: flex;
                justify-content: space-between;

                button {
                    width: 100px;
                    padding: 15px;
                    font-size: 20pt;
                    border-radius: 8px;
                    background-color: #be758c;
                    color: white;
                }
            }

            p {
                font-size: 36pt;
                text-align: center;
                margin-bottom: 75px;
            }

            input {
                border: 2px solid #be758c;
                border-radius: 15px;
                width: 100%;
                height: 40px;
            }
        }

    }

    .whiteArea {
        // width: 60vw;
        display: flex;
        align-items: center;
        flex-direction: column;

        .top {
            width: 60vw;
            display: flex;

            .topLeft {
                width: 30vw;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: rgb(36, 149, 36);
            }

            .topRight {
                width: 30vw;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: rgb(209, 19, 19);
            }
        }

        .btn {
            display: flex;
            justify-content: center;
            align-items: center;

            .numBtn {
                width: 30vw;
                height: 8vh;
                border-radius: 20px;
                color: white;
                background-color: #be758c;
                font-size: 18pt;
            }
        }



        .content {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: auto;

            .block {
                display: flex;
                width: 60%;
                justify-content: space-between;
                align-items: center;
                font-size: 24pt;
                border: 5px solid #be758c;
                border-radius: 20px;
                padding: 15px 20px 15px 35px;
                margin: 10px 0;

                .haha {
                    display: flex;
                    align-items: center;

                    span {
                        margin-right: 30px;
                    }

                    button {
                        width: 125px;
                        font-size: 18pt;
                        padding: 15px;
                        border-radius: 20px;
                        color: white;
                        background-color: #be758c;
                    }
                }
            }
        }
    }
}

@media (max-width: 1500px) {
    .bgArea {
        flex-direction: column;

        .whiteArea {
            // width: 60vw;
            overflow: auto;
            display: flex;
            align-items: center;
            flex-direction: column;

            .top {
                width: 60vw;
                display: flex;

                .topLeft {
                    width: 30vw;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: rgb(36, 149, 36);
                }

                .topRight {
                    width: 30vw;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: rgb(209, 19, 19);
                }
            }

            .btn {
                display: flex;
                justify-content: center;
                align-items: center;

                .numBtn {
                    width: 30vw;
                    height: 8vh;
                    border-radius: 20px;
                    color: white;
                    background-color: #6eceda;
                    font-size: 18pt;
                }
            }



            .content {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                overflow: auto;

                .block {
                    display: flex;
                    width: 60%;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 24pt;
                    border: 5px solid #6eceda;
                    border-radius: 20px;
                    padding: 15px 20px 15px 35px;
                    margin: 10px 0;

                    .haha {
                        display: flex;
                        align-items: center;

                        span {
                            margin-right: 30px;
                        }

                        button {
                            width: 125px;
                            font-size: 18pt;
                            padding: 15px;
                            border-radius: 20px;
                            color: white;
                            background-color: #6eceda;
                        }
                    }
                }
            }
        }

        .blueArea {
            position: sticky;
            top: 0;
            height: 20vh;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            background-color: #6eceda;

            .headLeft {
                display: flex;
            }

            .headRight {
                display: flex;
                align-items: center;
            }

            .change {
                font-size: 14pt;
            }
        }

        .blueArea {

            .dialog-wrapper1 {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(0, 0, 0, 0.5); //000為黑 不透明度為0.5
                z-index: 999;
            }

            .dialog1 {
                width: 600px;
                height: 400px;
                background: white;
                color: #6eceda;
                text-align: left;
                padding: 50px 100px;
                border-radius: 20px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

                .btnSep {
                    margin-top: 20px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    position: relative;

                    .tyty {
                        background-color: #fff;
                        color: #6eceda;
                        font-size: 25pt;
                        border: 0px;
                        position: absolute;
                        right: -70px;
                        bottom: 220px;
                    }

                    button {
                        padding: 15px;
                        font-size: 18pt;
                        border-radius: 8px;
                        background-color: #6eceda;
                        color: white;
                    }
                }

                p {
                    font-size: 18pt;
                }

                input {
                    border: 2px solid #6eceda;
                    border-radius: 15px;
                    width: 100%;
                    height: 40px;
                }
            }

            .dialog-wrapper2 {
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
            }

            .dialog {
                width: 600px;
                height: 400px;
                background: white;
                color: #6eceda;
                text-align: left;
                padding: 0 100px;
                border-radius: 20px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

                .btnSep {
                    margin-top: 20px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;

                    button {
                        width: 100px;
                        padding: 15px;
                        font-size: 20pt;
                        border-radius: 8px;
                        background-color: #6eceda;
                        color: white;
                    }
                }

                p {
                    font-size: 36pt;
                    text-align: center;
                    margin-bottom: 75px;
                }

                input {
                    border: 2px solid #6eceda;
                    border-radius: 15px;
                    width: 100%;
                    height: 40px;
                }
            }

        }
    }
}
</style>
