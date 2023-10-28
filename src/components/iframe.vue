<script>
export default {
    data() {
        return {
            scenes: [
                {
                    scenesAreaIndex: 1,
                    characterIndex: 3,
                    character: "旁白",
                    text: "時逢2023年年末，這是一個非常非常寒冷的冬天。風在吹，咻咻咻。風中有匹很帥氣的狼，他的名字叫做豪。",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 1,
                    character: "豪",
                    text: "對，我好帥，哈哈!!!",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "旁白",
                    text: "在這學校的深處，住著一個可愛，玲人，氣質，善解人意，溫柔的女孩子，而她的名字是...",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 3,
                    character: "嵐",
                    text: "對，我單身，謝謝~",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "旁白",
                    text: "冷肅的冬，靜寂的校園，命運的紅線，即將交織出，兩人不曾想像過的故事...",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "旁白",
                    text: "(因為劇情關係，直接快轉到第一次的事件分歧~)",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "豪",
                    text: "嗨~這麼晚了，還沒回家啊，嵐。妳等等有事情嗎?要不要一起吃晚餐?",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "嵐",
                    text: "嗯~我想一下喔",
                    options: {                  //分歧事件1 full yes good ending.
                        show: true,
                        yes: "好啊，不然一起去吃飯吧哈哈~",   //index ++
                        no: "不了，我等等有事情"             //index to 
                    }
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "旁白",
                    text: "就這樣，兩人一起吃了一頓愉快的晚餐♡",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "旁白",
                    text: "(然後時光飛逝，一下就到了第二次的事件分歧~)",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "豪",
                    text: "嗨~這麼晚了，還沒回家啊，嵐。妳等等有事情嗎?要不要一起吃晚餐?(這是第二次邀約唷，如果台詞很類似，只是因為豪詞窮了)",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "嵐",
                    text: "嗯~我想一下喔",
                    options: {                  //分歧事件2 full yes good ending.
                        show: true,
                        yes: "好啊，不然一起去吃飯吧哈哈~",   //index ++
                        no: "不了，我等等有事情"             //index to 
                    }
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "旁白",
                    text: "就這樣，兩人一起吃了一頓愉快的晚餐♡♡",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "旁白",
                    text: "(然後，一下就到了第三次的事件分歧~)",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "豪",
                    text: "嗨~嵐!要不要一起吃晚餐?(這是第三次邀約~)",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "嵐",
                    text: "嗯~我想一下喔",
                    options: {                  //分歧事件3 full yes good ending.
                        show: true,
                        yes: "好啊，不然一起去吃飯吧哈哈~",   //index ++
                        no: "不了，我等等有事情"             //index to 
                    }
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "旁白",
                    text: "就這樣，兩人一起吃了一頓愉快的晚餐♡♡♡",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "旁白",
                    text: "(然後學期末，現在是告白時間~)",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "嵐",
                    text: "有什麼事情嗎?突然把我叫出來?",
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "豪",
                    text: "我有一件事情想跟妳說，那就是...",
                    options: {                  //告白1 full yes good ending.
                        show: true,
                        yes: "其實...我喜歡妳很久了...",   //index ++
                        no: "...(靜默無語)"             //index to 
                    }
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "嵐",
                    text: "其實...我也喜歡你很久了...", //告白成功 good ending [21]
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "旁白",
                    text: "就這樣...有情人終成眷屬，可喜可賀，故事結束", //告白成功 good ending
                },


                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "嵐",
                    text: "...我以為我們只是朋友...對不起...", //告白失敗 bad ending [23]
                },
                {
                    scenesAreaIndex: 1,
                    characterIndex: 0,
                    character: "旁白",
                    text: "...兩人相視無語，轉身而去，就好像什麼事情都沒發生過一樣...", //告白失敗 bad ending
                },









            ],
            character: [
                "https://www.62icon.com/images/uploads/artwork/default/984d4a8b99e8bc884000265c7a74eec1.png",//狼[0]
                "https://i.ytimg.com/vi/IVD2DemS3sE/hqdefault.jpg", //帽[1]
                "https://pic.pimg.tw/ananana/1350270376-2458334287.jpg", //奶奶[2]
                "../../public/trans.png"//旁白[3]
            ],
            scenesArea: [
                "https://png.pngtree.com/thumb_back/fh260/background/20230328/pngtree-building-a-distant-mountain-game-scene-image_2117869.jpg", //沙漠[0]
                "https://cdn.tatlerasia.com/tatlerasia/i/2023/03/21132800-gettyimages-487818021_cover_1024x683.jpg", //森林[1]
                "https://media.istockphoto.com/id/1300845179/zh/%E7%85%A7%E7%89%87/%E5%BE%9E%E6%B0%B4%E4%B8%8B%E7%9C%8B%E5%88%B0%E7%9A%84%E6%B7%B1%E8%97%8D%E8%89%B2%E6%B5%B7%E6%B4%8B%E8%A1%A8%E9%9D%A2.jpg?s=612x612&w=0&k=20&c=bYuj2qUDkwAFD49mT7istAaAHKBXft13NUOVIeW_YRs=", //海洋[2]
            ],
            tokimeki: 0,
            currentCharacterIndex: "3", //第一張圖片:預設旁白
            displayedText: "",
            currentIndex: 0,
            R: Math.floor(Math.random() * 30) + 70
        };
    },
    mounted() {
        this.displayText();
    },
    methods: {

        displayText() {
            const currentScene = this.scenes[this.currentIndex];
            if (this.displayedText.length < currentScene.text.length) {
                this.displayedText += currentScene.text.charAt(this.displayedText.length);
                setTimeout(this.displayText, 40); // 控制每个字显示的速度
            }
        },
        showPreviousDialog() {
            this.currentIndex--;
            if (this.currentIndex < this.scenes.length) {
                const currentScene = this.scenes[this.currentIndex];
                this.displayedText = "";
                this.currentCharacterIndex = currentScene.characterIndex; // 更新当前角色图像索引
                this.displayText();
            } else {
                // 已经显示完所有场景，可以添加适当的结束逻辑
            }
        },
        showNextDialog() {
            this.currentIndex++;
            if (this.currentIndex < this.scenes.length) {
                const currentScene = this.scenes[this.currentIndex];
                this.displayedText = "";
                this.currentCharacterIndex = currentScene.characterIndex; // 更新当前角色图像索引
                this.displayText();
            } else {
                // 已经显示完所有场景，可以添加适当的结束逻辑
            }
        },
        showOptions() {
            // 设置选项为可见
            this.scenes[this.currentIndex].options.show = true;
        },
        handleOption(choice) {
            if (choice === 'yes') { //場景選擇器
                this.currentIndex++;
                this.tokimeki += 20 + this.R * 0.05
                console.log("本次告白門檻" + this.R)
                console.log("目前心動指數" + this.tokimeki)
                if (this.R < this.tokimeki && this.currentIndex > 19) {
                    this.currentIndex = 20
                }
                if (this.R >= this.tokimeki && this.currentIndex > 19) {
                    this.currentIndex = 22
                }
            } else if (choice === 'no') {
                this.currentIndex = this.currentIndex + 2;
                console.log("本次告白門檻" + this.R)
                console.log("目前心動指數" + this.tokimeki)
            }
            if (this.currentIndex < this.scenes.length) {
                const currentScene = this.scenes[this.currentIndex];
                this.displayedText = "";
                this.currentCharacterIndex = currentScene.characterIndex; // 更新当前角色图像索引
                this.displayText();
            } else {
                // 已经显示完所有场景，可以添加适当的结束逻辑
            }
        }

    },
};
</script>
<template>
    <div class="body">
        <div class="area2">
            <div class="gameFace"
                :style="{ 'background-image': 'url(' + scenesArea[scenes[currentIndex].scenesAreaIndex] + ')' }">
                <div class="showPeople">
                    <img class="showPosition" :src="character[currentCharacterIndex]" alt="">
                </div>
                <img src="" alt="">
            </div>
            <div class="gameContent">
                <span class="characterName">{{ scenes[currentIndex].character }}</span>
                <p style="font-size: 18pt;" class="characterChat">{{ displayedText }}</p>
                <button class="goPreviousDialog" @click="showPreviousDialog">顯示上一條對話</button>
                <button class="goNextDialog" @click="showNextDialog">顯示下一條對話</button>
                <!-- <button @click="showOptions">顯示選項</button> -->

                <!-- 显示选项 -->
                <div v-if="scenes[currentIndex].options && scenes[currentIndex].options.show">
                    <button @click="handleOption('yes')">{{ scenes[currentIndex].options.yes }}</button>
                    <button @click="handleOption('no')">{{ scenes[currentIndex].options.no }}</button>
                </div>
            </div>
        </div>
        <div class="area1">
            <iframe class="game1" src="https://gorisanson.github.io/pikachu-volleyball/zh/" frameborder="0"></iframe>
        </div>
        <div class="area1">
            <iframe class="game2" src="http://127.0.0.1:5500/test.html" frameborder="0"></iframe>
        </div>
        <div class="area1">
            <iframe class="game2" src="http://127.0.0.1:5500/test2.html" frameborder="0"></iframe>
        </div>
        <div class="area1">
            <iframe class="game2" src="http://127.0.0.1:5500/test3.html" frameborder="0"></iframe>
        </div>
        <div class="area1">
            <iframe class="game2" src="http://127.0.0.1:5500/pic01.html" frameborder="0"></iframe>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.area2 {
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    width: 70vw;
    height: 70vh;
    border: 3px solid #7a1723;

    .gameFace {
        width: 100%;
        height: 60%;
        background-repeat: no-repeat;
        background-size: 100% 100%;

        .showPeople {
            display: flex;
            align-items: center;
            justify-content: center;

            .showPosition {
                width: 300px;
                height: 300px;
            }
        }
    }

    .gameContent {
        width: 100%;
        height: 40%;
        border: 3px solid;
        padding: 50px;
        position: relative;

        .characterName {
            padding: 15px;
            border: 3px solid #7a1723;
            position: absolute;
            top: 0;
        }

        .characterChat {
            margin-top: 10px;
        }

        .goPreviousDialog {
            position: absolute;
            bottom: 10px;
            right: 200px;
            border: 3px solid #7a1723
        }

        .goNextDialog {
            position: absolute;
            bottom: 10px;
            right: 50px;
            border: 3px solid #7a1723
        }
    }
}

.body {
    display: flex;
    flex-direction: column;
    align-items: center;

}

.area1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    width: 70vw;
    height: 70vh;
    border: 3px solid #7a1723;

    iframe {
        width: 69vw;
        height: 69vh;
    }
}
</style>


<!-- 
<script> //上課保存 10.24
export default {
    data() {
        return {
            point: 0,
            ntd: 0
        }
    },
    methods: {
        addPonit() {
            this.point += 1;
        }
        
    },
    watch: {
        point() {
            this.ntd = this.point * 10
        }
    },
    computed: {
        jyp() {
            return this.ntd * 4.63
        }
    }
}
</script> -->

<!-- <div class="area1">
    <h1>{{ this.point }}</h1>
    <h1>{{ this.ntd }}</h1>
    <h1>{{ this.jyp }}</h1>
    <button v-on:click="addPonit">按我</button>
    <input class="search__button" type="button" name="" value="GO">
</div> -->





