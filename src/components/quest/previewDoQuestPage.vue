<script>
export default {
    data() {
        return {
            searchAllList: {
                hwQuestionnaireList: [],
                hwQuestionList: []
            },
            hi: ''
        };
    },
    props: ["checkinfo"],

    mounted() {
        this.search();
    },
    methods: {

        userCreate() {
            this.processSelectedOptions();
            const userResponse = {
                user: {
                    //加入變數在此!!
                    questionnaireId: this.$route.params.wantId,
                    phoneNumber: this.checkinfo.phoneNumber,
                    name: this.checkinfo.name,
                    email: this.checkinfo.email,
                    age: this.checkinfo.age,
                    ans: this.hi
                },
            };





            fetch('http://localhost:8080/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userResponse)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    alert("填寫問卷成功");
                })
                .catch(error => console.error('Error:', error));
        },

        //分類 並且成功取得相應的index
        processSelectedOptions() {
            const selectedOptions = [];

            for (const key in this.checkinfo) {
                if (this.checkinfo[key]) {
                    const [questionId, index] = key.split('_');
                    const optionText = this.searchAllList.hwQuestionList.find(item => item.questionId == questionId)?.optionText;

                    selectedOptions.push({
                        questionId,
                        optionIndex: parseInt(index),
                        optionValue: this.checkinfo[key],
                        optionTextSplit: optionText ? optionText.split(';') : []
                    });
                }
            }

            const sortedOptions = {};

            // 將選項按照 questionId 分類
            for (const option of selectedOptions) {
                if (!sortedOptions[option.questionId]) {
                    sortedOptions[option.questionId] = [];
                }
                sortedOptions[option.questionId].push(option);
            }

            let ans = ""; // 用來儲存所有答案

            // 將分類後的選項按要求處理並整合到 ans 中
            for (const questionId in sortedOptions) {
                if (["name", "phoneNumber", "email", "age"].includes(questionId)) {
                    continue; // 排除基本資料
                }

                const options = sortedOptions[questionId];

                options.sort((a, b) => a.optionIndex - b.optionIndex);

                const answers = options.map(option => {
                    if (isNaN(option.optionIndex)) {
                        return option.optionValue;
                    } else {
                        return option.optionTextSplit[option.optionIndex];
                    }
                });

                ans += answers.join(';') + ';'; // 以分號結尾
            }

            // 去除最後一個分號
            if (ans.endsWith(';')) {
                ans = ans.slice(0, -1);
            }

            console.log(`Answer: ${ans}`);
            this.hi = ans;
            console.log(this.hi);
        },


        search() {
            const questionnaireIdToFind = this.$route.params.wantId;
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
                    console.log(data);

                    const filteredQuestionnaire = data.hwQuestionnaireList.find(item => item.questionnaireId == questionnaireIdToFind);
                    console.log(filteredQuestionnaire)

                    if (filteredQuestionnaire) {
                        this.searchAllList.hwQuestionnaireList = filteredQuestionnaire;
                        this.searchAllList.hwQuestionList = data.hwQuestionList.filter(item => item.questionnaireId == questionnaireIdToFind);
                    }
                    console.log(this.searchAllList);
                })
                .catch(error => console.error('Error:', error));
        },
    },
};
</script>

<template>
    <div class="personalDetail">
        <h1>本次填寫問卷確認頁面</h1>
        <p>姓名{{ checkinfo.name }}</p>
        <p>手機{{ checkinfo.phoneNumber }}</p>
        <p>Email{{ checkinfo.email }}</p>
        <p>年齡{{ checkinfo.age }}</p>

    </div>
    <div class="previewArea">

        <h2>填寫問卷預覽</h2>

        <div v-for="(question, index) in searchAllList.hwQuestionList" :key="index">

            <label>問題 {{ index + 1 }}: {{ question.questionText }}</label>
            <span style="color: red;" v-if="question.necessary == 1">*</span>

            <div v-if="question.questionType === 'radio'">
                <div v-for="(option, optionIndex) in question.optionText.split(';')" :key="optionIndex">
                    <input type="radio" disabled="disabled" :id="'q_' + index + '_o_' + optionIndex" :value="option"
                        :name="'question_' + index" v-model="checkinfo[question.questionId]">
                    <label :for="'q_' + index + '_o_' + optionIndex">{{ option }}</label>
                </div>
            </div>
            <div v-else-if="question.questionType === 'checkbox'">
                <div v-for="(option, optionIndex) in question.optionText.split(';')" :key="optionIndex">
                    <input type="checkbox" disabled="disabled" :id="'q_' + index + '_o_' + optionIndex" :value="option"
                        v-model="checkinfo[question.questionId + '_' + optionIndex]">
                    <label :for="'q_' + index + '_o_' + optionIndex">{{ option }}</label>
                </div>
            </div>
            <div v-else-if="question.questionType === 'text'">
                <input type="text" disabled="disabled" v-model="checkinfo[question.questionId]">
            </div>
        </div>

        <div class="makebody"></div>
        <a href="/questFrontHome"><button class="makesure" @click="userCreate()">確認送出</button></a>
    </div>
</template>

<style lang="scss" scoped>
.personalDetail {
    width: 900px;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 20px;
    background-color: #fff;

    div {
        display: flex;
        align-items: center;
        margin: 10px 0;
    }

    label {
        width: 100px;
        font-weight: bold;
    }

    input {
        flex: 1;
    }
}

.previewArea {
    width: 900px;
    border: 1px solid #ccc;
    border-radius: 10px;
    // padding: 20px;
    padding: 20px 20px 100px 20px;
    margin-top: 20px;
    background-color: #fff;
    position: relative;

    
    .makesure {
        position: absolute;
        right: 20px;
        bottom: 20px;
        margin-top: 20px;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: #ff6a00; ////
        color: #fff;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
                    background-color: #cf421b; ////
                }
    }
}
</style>
