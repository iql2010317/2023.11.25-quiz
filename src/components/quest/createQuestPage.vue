<script>
export default {
    data() {
        return {
            questionName: '',
            description: '',
            startTime: '',
            endTime: '',
            questArr: [],
            questionTypes: ["radio", "checkbox", "text"],
            hwQuestionList: [],
            necessary: ''
        }
    },
    methods: {
        createNewQuest() {
            const newQuestion = {
                questionType: '',
                questionText: '',
                optionText: '',
                necessary: '', //新增 必填屬性 //db預設值為0 ==不用填 necessary=1為必填(true)

                question: [],  //舊的屬性
                options: [],   //舊的屬性
            };

            this.questArr.push(newQuestion);
            this.hwQuestionList.push(newQuestion); //新增位置
        },

        createNewOptions(questionIndex) {
            const newOption = {
                text: '',
            }
            this.questArr[questionIndex].options.push(newOption);

            const optionTextArray = this.questArr[questionIndex].options.map(option => option.text);
            this.questArr[questionIndex].optionText = optionTextArray.join(';');
        },

        deleteNewQuest(questionIndex) {

            if (this.questArr.length > 1) {
                this.questArr.splice(questionIndex, 1);
            } else {
                alert("至少需要保留一個問題。");
            }
        },
        deleteNewOptions(questionIndex, optionIndex) {
            this.questArr[questionIndex].options.splice(optionIndex, 1);
            const optionTextArray = this.questArr[questionIndex].options.map(option => option.text);
            this.questArr[questionIndex].optionText = optionTextArray.join(';');
        },

        postToDbNotPublishedYet() {

            // 檢查問卷名稱
            if (
                this.questionName.trim() === ''
            ) {
                alert('問卷名稱、不得為空。');
                return;
            }
            // 檢查描述
            if (
                this.description.trim() === ''
            ) {
                alert('問卷描述、不得為空。');
                return;
            }

            // 檢查開始時間
            if (
                this.startTime.trim() === ''
            ) {
                alert('開始時間、不得為空。');
                return;
            }

            // 檢查結束時間
            if (
                this.endTime.trim() === ''
            ) {
                alert('結束時間、不得為空。');
                return;
            }

            // 檢查時間
            const startDateTime = new Date(this.startTime);
            const endDateTime = new Date(this.endTime);

            if (endDateTime <= startDateTime) {
                alert('結束時間不能早於或等於開始時間。');
                return;
            }


            // 至少一題且檢查問題文本不為空
            if (this.questArr.length == 0 || this.questArr.every(question => question.questionText.trim() === '')) {
                alert('至少要有一題且問題文本不得為空');
                return;
            }

            // 檢查類型是否存在
            for (let i = 0; i < this.questArr.length; i++) {
                const question = this.questArr[i];
                if (question.questionType.trim() === '') {
                    alert('給問題一個類型');
                    return;
                }
            }

            for (let i = 0; i < this.questArr.length; i++) {
                const question = this.questArr[i];

                // 至少要有兩個選項
                if ((question.questionType === 'radio' || question.questionType === 'checkbox') && question.options.length < 2) {
                    alert('單選或多選題，至少要有兩個選項');
                    return;
                }
            }

            //問題不得為空
            for (let i = 0; i < this.questArr.length; i++) {
                const question = this.questArr[i];

                if (question.questionText.trim() === '') {
                    alert('問題不得為空');
                    return;
                }

                // 選項不得為空
                if (question.options.length > 0) {
                    for (let j = 0; j < question.options.length; j++) {
                        if (question.options[j].text.trim() === '') {
                            alert('選項不得為空');
                            return;
                        }
                    }
                }
            }

            const newQuestionnaire = {
                hwQuestionnaire: {
                    questionName: this.questionName,
                    description: this.description,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    published: 0,
                },
                hwQuestionList: this.hwQuestionList,
            };

            this.questArr.forEach((quest, questionIndex) => {
                const optionTextArray = quest.options.map(option => option.text);
                this.questArr[questionIndex].optionText = optionTextArray.join(';');
            });

            console.log(newQuestionnaire)

            fetch('http://localhost:8080/api/HwQuestionnaire/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newQuestionnaire)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.error('Error:', error));
            alert("成功新增問卷，狀態為未發布(published=0)")
        },


        postToDbAndPublished() {

            // 檢查問卷名稱
            if (
                this.questionName.trim() === ''
            ) {
                alert('問卷名稱、不得為空。');
                return;
            }
            // 檢查描述
            if (
                this.description.trim() === ''
            ) {
                alert('問卷描述、不得為空。');
                return;
            }

            // 檢查開始時間
            if (
                this.startTime.trim() === ''
            ) {
                alert('開始時間、不得為空。');
                return;
            }

            // 檢查結束時間
            if (
                this.endTime.trim() === ''
            ) {
                alert('結束時間、不得為空。');
                return;
            }

            // 檢查時間
            const startDateTime = new Date(this.startTime);
            const endDateTime = new Date(this.endTime);

            if (endDateTime <= startDateTime) {
                alert('結束時間不能早於或等於開始時間。');
                return;
            }


            // 至少一題且檢查問題文本不為空
            if (this.questArr.length == 0 || this.questArr.every(question => question.questionText.trim() === '')) {
                alert('至少要有一題且問題文本不得為空');
                return;
            }

            // 檢查類型是否存在
            for (let i = 0; i < this.questArr.length; i++) {
                const question = this.questArr[i];
                if (question.questionType.trim() === '') {
                    alert('給問題一個類型');
                    return;
                }
            }

            for (let i = 0; i < this.questArr.length; i++) {
                const question = this.questArr[i];

                // 至少要有兩個選項
                if ((question.questionType === 'radio' || question.questionType === 'checkbox') && question.options.length < 2) {
                    alert('單選或多選題，至少要有兩個選項');
                    return;
                }
            }

            //問題不得為空
            for (let i = 0; i < this.questArr.length; i++) {
                const question = this.questArr[i];

                if (question.questionText.trim() === '') {
                    alert('問題不得為空');
                    return;
                }

                // 選項不得為空
                if (question.options.length > 0) {
                    for (let j = 0; j < question.options.length; j++) {
                        if (question.options[j].text.trim() === '') {
                            alert('選項不得為空');
                            return;
                        }
                    }
                }
            }


            const newQuestionnaire = {
                hwQuestionnaire: {
                    questionName: this.questionName,
                    description: this.description,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    published: 1,
                },
                hwQuestionList: this.hwQuestionList,
            };

            this.questArr.forEach((quest, questionIndex) => {
                const optionTextArray = quest.options.map(option => option.text);
                this.questArr[questionIndex].optionText = optionTextArray.join(';');
            });

            console.log(newQuestionnaire)

            fetch('http://localhost:8080/api/HwQuestionnaire/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newQuestionnaire)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.error('Error:', error));
            alert("成功新增問卷，狀態為已發布(published=1)")

        },
        getCurrentDate() {
            const today = new Date();
            const year = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDate();

            // 将月份和日期格式化为两位数
            month = month < 10 ? `0${month}` : month;
            day = day < 10 ? `0${day}` : day;

            // 返回 YYYY-MM-DD 格式的当前日期字符串
            return `${year}-${month}-${day}`;
        }

    }
}
</script>

<template>
    <div class="createQuestPageBody">
        <div class="createQuestHeader">
            <h1>新增問卷</h1>
            <div>
                <label for="">問卷名稱</label>
                <input style="width: 100%;" type="text" name="" id="" v-model="this.questionName">
            </div>
            <div class="textbox">
                <label for="">描述內容</label>
                <textarea style="width: 100%;" name="" id="" cols="30" rows="10" v-model="this.description"></textarea>
            </div>
            <div>
                <label for="">問卷開始時間</label>
                <input type="date" name="" id="" v-model="this.startTime" :min="getCurrentDate()">
                <label for="">問卷結束時間</label>
                <input type="date" name="" id="" v-model="this.endTime" :min="getCurrentDate()">
            </div>
            <div>
                <button v-on:click="createNewQuest()">新增問題</button>
                <button v-on:click="postToDbNotPublishedYet()">儲存問卷，暫且不發布</button>
                <button v-on:click="postToDbAndPublished()">儲存問卷，並且發布</button>
                <a href="/questHome"><button class="backToHome" >返回後台列表</button></a>
            </div>
        </div>

        <div class="createQuest" v-for="(quest, questionIndex) in questArr" :key="questionIndex">
            <label>第{{ questionIndex + 1 }}題</label>
            <select v-model="quest.questionType">
                <option v-for="(type, index) in questionTypes" :key="index" :value="type">{{ type === 'radio' ? '單選' : type
                    === 'checkbox' ? '複選' : '簡答' }}</option>
            </select>
            <input type="text" v-model="quest.questionText" placeholder="輸入題目">
            <button @click="createNewOptions(questionIndex)">新增選項</button>
            <label for="">是否必填</label>
            <input type="checkbox" v-model="quest.necessary">
            <!-- {{ quest.necessary }} -->
            <div class="NewOptions" v-for="(option, optionIndex) in quest.options" :key="optionIndex">
                <input v-if="quest.questionType === 'radio'" type="radio" name="radioGroup"
                    v-model="quest.options[optionIndex].selected">
                <input v-if="quest.questionType === 'checkbox'" type="checkbox"
                    v-model="quest.options[optionIndex].selected">
                <input type="text" placeholder="輸入選項" v-model="quest.options[optionIndex].text">
                <button style="background-color: red;" @click="deleteNewOptions(questionIndex, optionIndex)">刪除選項</button>
            </div>

            <button style="margin-left: 43px; background-color: red;"
                v-on:click="deleteNewQuest(questionIndex)">刪除問題</button>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.createQuestPageBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;
    padding: 20px;

    .createQuestHeader {
        width: 900px;
        height: auto;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 20px;
        margin: 20px 0;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;

        .textbox {
            border-radius: 60px;
        }

        div {
            width: 100%;
            margin: 10px 0;
        }

        label {
            font-weight: bold;
            margin-right: 5px;
        }

        input[type="text"],
        input[type="date"] {
            width: 30%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 10px;
            margin-right: 5px;
        }

        input[type="date"] {
            height: auto;
        }

        button {
            background-color: #007BFF;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 10px;
        }

        button+button {
            margin-left: 10px;
        }

        .backToHome{
                margin-left: 190px;
                margin-top: 20px;
                padding: 10px;
                border: none;
                border-radius: 5px;
                background-color: #55c57a;
                color: #fff;
                cursor: pointer;
                transition: background-color 0.3s ease;

                &:hover {
                    background-color: #3a9e5f;
                }
        }
    }

    .createQuest {
        margin-top: 15px;
        width: 900px;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 20px;
        background-color: #fff;

        label {
            font-weight: bold;
        }

        input[type="text"] {
            margin-top: 15px;
            margin-bottom: 15px;
            width: 80%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-right: 15px;
        }

        input[type="radio"] {
            margin-right: 29px;
        }

        button {
            background-color: #007BFF;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    }
}
</style>
