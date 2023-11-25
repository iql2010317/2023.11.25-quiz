<script>
import previewdoQuestPage from '../quest/previewDoQuestPage.vue';
export default {
    data() {
        return {
            searchAllList: {
                hwQuestionnaireList: [],
                hwQuestionList: []
            },
            doquestArr: {
                userName: '',
                userPhone: '',
                userEmail: '',
                userAge: '',
            },
            userResponses: [],
            page: 1,
        };
    },
    mounted() {
        this.search();

    },
    methods: {

        search() {
            const questionnaireIdToFind = this.$route.params.wantId; 
            console.log("本頁頁碼 "+questionnaireIdToFind);

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

        goToPreviewPage() {
            this.page = 2




















            
            // this.doquestArr.userResponses = this.questArrLocal[this.a].questions.map(question => {
            //     if (question.questionType === 'radio') {
            //         const selectedOption = question.options.find(option => option.answers && option.answers.length > 0);
            //         return {
            //             question: question.question,
            //             answers: selectedOption ? selectedOption.text : '未選擇',
            //         };
            //     } else if (question.questionType === 'checkbox') {
            //         const selectedOptions = question.options.filter(option => option.answers && option.answers.length > 0);
            //         return {
            //             question: question.question,
            //             answers: selectedOptions.length > 0 ? selectedOptions.map(option => option.text) : [],
            //         };
            //     } else if (question.questionType === 'text') {
            //         // 处理简答题
            //         return {
            //             question: question.question,
            //             answers: question.userResponse || '未填寫',
            //         };
            //     }
            // });
        },
        backToQuestPage() {
            this.page = 1
        },
    },
    components: {
        previewdoQuestPage,
    }
};
</script>



<template>
    <div class="doQuestPageBody">
        <div class="doQuestHeader">
            <span>{{ searchAllList.hwQuestionnaireList.startTime }}~~{{ searchAllList.hwQuestionnaireList.endTime }}</span>
            <h6>問卷名稱:{{ searchAllList.hwQuestionnaireList.questionName }}</h6>
            <h6>問卷描述:{{ searchAllList.hwQuestionnaireList.description }}</h6>
        </div>

        <div class="backToFix" v-if="this.page == 1">
            <div class="fixedQuest">
                <div>
                    <label for="">姓名</label>
                    <input type="text" v-model="doquestArr.userName">
                </div>
                <div>
                    <label for="">手機</label>
                    <input type="text" v-model="doquestArr.userPhone">
                </div>
                <div>
                    <label for="">Email</label>
                    <input type="text" v-model="doquestArr.userEmail">
                </div>
                <div>
                    <label for="">年齡</label>
                    <input type="text" v-model="doquestArr.userAge">
                </div>
            </div>

            <div class="fluidQuest">
                <div v-for="(question, questionIndex) in searchAllList.hwQuestionList" :key="questionIndex">
                    <label>問題 {{ questionIndex + 1 }}: {{ question.questionText }}</label>

                    <div v-if="question.questionType === 'radio'">
                        <div v-for="(option, optionIndex) in question.optionText.split(';')" :key="optionIndex">
                            <input type="radio" :id="'q_' + questionIndex + '_o_' + optionIndex" :value="option"
                                v-model="question.userResponse">
                            <label :for="'q_' + questionIndex + '_o_' + optionIndex">{{ option }}</label>
                        </div>
                    </div>

                    <div v-else-if="question.questionType === 'checkbox'">
                        <div v-for="(option, optionIndex) in question.optionText.split(';')" :key="optionIndex">
                            <input type="checkbox" :id="'q_' + questionIndex + '_o_' + optionIndex" :value="option"
                                v-model="question.userResponse">
                            <label :for="'q_' + questionIndex + '_o_' + optionIndex">{{ option }}</label>
                        </div>
                    </div>

                    <div v-else-if="question.questionType === 'text'">
                        <input type="text" v-model="question.userResponse">
                    </div>
                </div>
                <button @click="goToPreviewPage">預覽填寫結果</button>
            </div>
        </div>



        <div class="showPreviewPage" v-if="this.page == 2">
            <previewdoQuestPage :checkinfo="doquestArr" />
            <button type="button" @click="backToQuestPage()">返回修改</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.doQuestPageBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;

    .doQuestHeader {
        width: 900px;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 20px;
        background-color: #fff;
    }

    .fixedQuest {
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

    .fluidQuest {
        width: 900px;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 20px;
        margin-top: 20px;
        background-color: #fff;
    }

    label {
        font-weight: bold;
    }

    input[type="radio"] {
        margin-right: 10px;
    }
}
</style>

