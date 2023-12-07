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


            searchAllList: {
                hwQuestionnaireList: [],
                hwQuestionList: []
            },
        }
    },

    mounted() {
        this.search();
    },

    methods: {
        createNewQuest() {
            const newQuestion = {
                questionType: '',
                question: [],
                options: [],
                questionText: '', // 添加 questionText 屬性
                optionText: '', //預計要讓選項全部在這裡  這裡不可為陣列 後端期待資料型態為字串
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

        postUpdateDataToDbNotPublishedYet() {

            this.questArr.forEach((quest, questionIndex) => {
                const optionTextArray = quest.options.map(option => option.text);
                this.questArr[questionIndex].optionText = optionTextArray.join(';');
            });

            console.log("Updated questArr Data:", this.questArr); // 確認更新後的 questArr 資料


            // ...剩餘的程式碼...
            // 在這裡將更新後的 questArr 資料複製到 hwQuestionList 中
            this.hwQuestionList = this.questArr.map((quest, index) => {
                return {
                    // 確保這裡的屬性與資料結構與 questArr 中的資料一致
                    questionId: quest.questionId, // 如果有 questionId 的話，請確保資料中包含此項目
                    questionnaireId: this.$route.params.updateQuestPageId,
                    questionType: quest.questionType,
                    necessary: quest.necessary,
                    questionText: quest.questionText,
                    options: quest.options.map(option => {
                        return {
                            text: option.text
                        };
                    }),
                    optionText: quest.optionText
                };
            });

            console.log("Final hwQuestionList Data:", this.hwQuestionList);
            var newQuestionnaire = {
                hwQuestionnaire: {
                    questionnaireId: this.$route.params.updateQuestPageId,
                    questionName: this.questionName,
                    description: this.description,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    published: 0,

                },
                hwQuestionList: this.hwQuestionList,
            };
            console.log(newQuestionnaire)

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




            fetch('http://localhost:8080/api/HwQuestionnaire/createOrUpdate', {
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
            alert("更新問卷成功 (尚未發布)")

        },

        postUpdateDataToDbAndPublished() {

            this.questArr.forEach((quest, questionIndex) => {
                const optionTextArray = quest.options.map(option => option.text);
                this.questArr[questionIndex].optionText = optionTextArray.join(';');
            });

            console.log("Updated questArr Data:", this.questArr); // 確認更新後的 questArr 資料


            // ...剩餘的程式碼...
            // 在這裡將更新後的 questArr 資料複製到 hwQuestionList 中
            this.hwQuestionList = this.questArr.map((quest, index) => {
                return {
                    // 確保這裡的屬性與資料結構與 questArr 中的資料一致
                    questionId: quest.questionId, // 如果有 questionId 的話，請確保資料中包含此項目
                    questionnaireId: this.$route.params.updateQuestPageId,
                    questionType: quest.questionType,
                    necessary: quest.necessary,
                    questionText: quest.questionText,
                    options: quest.options.map(option => {
                        return {
                            text: option.text
                        };
                    }),
                    optionText: quest.optionText
                };
            });

            console.log("Final hwQuestionList Data:", this.hwQuestionList);
            var newQuestionnaire = {
                hwQuestionnaire: {
                    questionnaireId: this.$route.params.updateQuestPageId,
                    questionName: this.questionName,
                    description: this.description,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    published: 1,

                },
                hwQuestionList: this.hwQuestionList,
            };
            console.log(newQuestionnaire)

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



            fetch('http://localhost:8080/api/HwQuestionnaire/createOrUpdate', {
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
            alert("更新問卷成功")

        },

        search() {
            const questionnaireIdToFind = this.$route.params.updateQuestPageId;
            console.log("本頁頁碼 " + questionnaireIdToFind);

            fetch('http://localhost:8080/api/HwQuestionnaire/search', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data); //第一次 全部的數據

                    const filteredQuestionnaire = data.hwQuestionnaireList.find(item => item.questionnaireId == questionnaireIdToFind);
                    if (filteredQuestionnaire) {
                        this.searchAllList.hwQuestionnaireList = filteredQuestionnaire;
                        this.searchAllList.hwQuestionList = data.hwQuestionList.filter(item => item.questionnaireId == questionnaireIdToFind);
                    }
                    console.log(this.searchAllList); //第二次 利用questionnaireId過濾數據

                    this.questionName = this.searchAllList.hwQuestionnaireList.questionName;
                    this.description = this.searchAllList.hwQuestionnaireList.description;
                    this.startTime = this.searchAllList.hwQuestionnaireList.startTime;
                    this.endTime = this.searchAllList.hwQuestionnaireList.endTime;
                    this.questArr = this.searchAllList.hwQuestionList ////這有有正確賦予值了
                    this.searchAllList.hwQuestionList.forEach(quest => {
                        quest.options = quest.optionText.split(';').map(option => ({ text: option }));
                    });





                })
                .catch(error => console.error('Error:', error));
        },
    }
}
</script>

<template>
    <div class="createQuestPageBody">
        <div class="createQuestHeader">
            <div>
                <h1>更新問卷(only for 未發布)</h1>
                <label for="">問卷名稱</label>

                <input style="width: 90%;" type="text" name="" id="" v-model="this.questionName">
            </div>
            <div>
                <label for="">描述內容</label>
                <input style="width: 90%;height: 150px;" type="text" name="" id="" v-model="this.description">
            </div>
            <div>
                <label for="">問卷開始時間</label>
                <input type="date" name="" id="" v-model="this.startTime">
                <label for="">問卷結束時間</label>
                <input type="date" name="" id="" v-model="this.endTime">
            </div>
            <div>
                <button v-on:click="createNewQuest()">新增問題</button>
                <button v-on:click="postUpdateDataToDbNotPublishedYet()">儲存問卷，暫且不發布</button>
                <button v-on:click="postUpdateDataToDbAndPublished()">儲存問卷，並且發布</button>
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
            {{ quest.necessary }}

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
