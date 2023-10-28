<script>

</script>

<template>
    <div class="bodyi2">
        <div class="c1">
            <h1>記帳</h1>
            <h2>結餘$</h2>
            <h2 class="pr">RWD+Pinia測試範圍</h2>
        </div>
        <div class="c23">
            <div class="c2">
                <div class="c2Left">
                    <h2>收入</h2>
                    <h2>$錢</h2>
                </div>
                <div class="c2Right">
                    <h2>支出</h2>
                    <h2>$錢</h2>
                </div>
            </div>
            <div class="c3">
                <h1>那個V-FOR範圍</h1>
            </div>
        </div>
    </div>
    <div class="body2"></div>
</template>

<style lang="scss" scoped>
.bodyi2 {
    margin-top: 10px;
    display: flex;

    .c1 {
        width: 300px;
        height: 600px;
        border: 2px solid #7a1723;
        margin-right: 50px;
        margin-left: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: red;
        .pr{
            font-size: 18pt;
        }
    }

    .c23 {

        .c2 {
            width: 600px;
            height: 200px;
            border: 2px solid #7a1723;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }

        .c3 {
            margin-top: 50px;
            width: 600px;
            height: 350px;
            border: 2px solid #7a1723;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}


@media (max-width: 1500px) {
    .bodyi2 {
        flex-direction: column;
        align-items: center;

        .c1 {
            // margin-top: 10px;
            height: 100px;
            width: 1200px;
            margin-left: 0;
            margin-right: 0;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            background-color: green;
        }

        .c23 {
            display: flex;

            .c2 {
                margin-left: 0;
                margin-top: 25px;
                width: 575px;
                height: 350px;
            }

            .c3 {
                width: 575px;
                margin-top: 25px;
                margin-left: 50px;
            }
        }
    }
}

@media (max-width: 1250px) {
    .bodyi2 {
        flex-direction: column;
        align-items: center;

        .c1 {
            // margin-top: 10px;
            height: 100px;
            width: 900px;
            margin-left: 0;
            margin-right: 0;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            background-color: blue;
        }

        .c23 {
            display: flex;

            .c2 {
                margin-left: 0;
                margin-top: 25px;
                width: 200px;
                height: 350px;
            }

            .c3 {
                width: 650px;
                margin-top: 25px;
                margin-left: 50px;
            }
        }
    }
}
</style>