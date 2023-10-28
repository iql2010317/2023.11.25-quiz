<script>
export default {
  data() {
    return {
      panels: [
        { image: "../../public/27710_0.jpg" },
        { image: "../../public/27711_0.jpg" },
        { image: "../../public/bg03.jpg" },
        { image: "../../public/uyuni-bolivia-cabecera.jpg" },
        { image: "../../public/09.24.jpg" },
      ],
      activePanel: 0,
    };
  },
  methods: {
    setActive(index) {
      if (this.activePanel === index) {
        return;
      }
      if (this.activePanel !== null) {
        this.panels[this.activePanel].active = false;
      }
      this.panels[index].active = true;
      this.activePanel = index;
    },
  },
};
</script>


<template>
  <h1 style="font-family: fantasy; text-align: center; margin: 30px 0">About Me</h1>

  <div class="c1">
    <div class="c1Left">
      <ul>
        <li>姓　　名：鐘玉翔</li>
        <li>學　　校：台灣科技大學</li>
        <li>科　　系：化學工程系</li>
        <li>日文能力：JLPT N1</li>
        <li>工作經歷：光洋科　　品管　2022/03~2023/09</li>
        <li>　　　　　佳勝科技　助工　2021/02~2022/03</li>
        <li>　　　　　三岳化成　品保　2019/02~2021/02</li>
        <li>　　　　　同泰電子　助工　2018/02~2019/02</li>
        <audio class="test" src="../../public/paiClip.mp3" controls></audio>
      </ul>
      <div class="toutei">
        <img class="touteipic" style="object-fit: cover;
            border-radius: 5px; object-position: 50% 50%; width: 150px; height: 180px;" src="../../public/pro001.jpg"
          alt="">
      </div>
    </div>
    <div class="c1Right">
      <div v-for="(panel, index) in panels" style="object-fit: cover;
            object-position: 50% 50%;" :key="index" class="panel" @click="setActive(index)"
        :style="{ backgroundImage: `url(${panel.image})` }" :class="{ active: activePanel === index }"></div>
    </div>
  </div>
  <div class="br"></div>

</template>

<style lang="scss" scoped>

  @media (max-width: 1500px) {
    .c1 {
        flex-direction: column;
        align-items: center;
        .c1Left{
          // background-color: #782b2b;
          // width: 1700px; //沒吃到設定
          margin-bottom: 50px;
        }
    }
}
.c1 {
  width: 100vw;
  display: flex;

  .c1Left {
    margin-left: 50px;
    width: 600px;
    position: relative;
    // border: 1px solid;
    .test{
      position: absolute;
      top: 0;
      right: -80px;
      z-index: 2;
      opacity: 0;
    }

    .toutei {
      width: 150px;
      height: 180px;
      position: absolute;
      top: 0;
      left: 340px;
      // right: 110px;
    }


    li {
      font-size: 16pt;
      margin-bottom: 15px;
    }
  }

  .c1Right {
    width: 850px;
    height: 400px;
    // border: 1px solid;
    display: flex;

    .panel {
      width: 800px;
      height: 400px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 50px;
      margin-right: 15px;
      cursor: pointer;
      flex: 0.5;
      position: relative;
      transition: flex 0.6s ease-in;

      &.active {
        flex: 5;
      }
    }
  }
}
.br {
  margin-left: 4vw;
  margin-top: 6vh;
  width: 90vw;
  height: 3px;
  background-color: black;
}
</style>
