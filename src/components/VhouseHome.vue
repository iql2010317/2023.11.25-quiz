<script>
import { RouterLink,RouterView } from "vue-router";
export default {
    data() {
        return {

        }
    },
    components: {
        RouterLink,
        RouterView,
    }
}
</script>
<template>
    <div>
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="../../public/房地產圖片/banner1.png" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="../../public/房地產圖片/banner2.png" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="../../public/房地產圖片/banner3.png" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
</div>

    <RouterLink style="text-decoration: none;" to="/Vhouse/sagasu">
        <div class="sagasu">
        <div>タッグから探す</div>
        <div>エリアから探す</div>
        <div>沿線・駅から探す</div>
    </div>
    </RouterLink>

</template>
<style lang="scss" scoped>
    .sagasu{
        width: 100vw;
        height: 50vh;
        background-color: #d7d6e9;
        display: flex;
        justify-content: space-around;
        div{
            display: flex;
            justify-content: center;
            align-items:center;
            margin-top: 45px;
            width: 350px;
            height: 150px;
            background-color: #8e9dba;
            border-radius: 15px;
            color: white;
            font-size: 24pt;
        }
    }
</style>