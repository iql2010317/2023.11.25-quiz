<script>
import previewdoQuestPage from '../quest/previewDoQuestPage.vue';
export default {
    data() {
        return {
            searchAllList: {
                hwQuestionnaireList: [],
                hwQuestionList: []
            },
            doquestArr: [], //現在更改為陣列
            page: 1,

        };
    },
    mounted() {
        this.search();
    },
    methods: {

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
                    console.log(data); //第一次 全部的數據

                    const filteredQuestionnaire = data.hwQuestionnaireList.find(item => item.questionnaireId == questionnaireIdToFind);
                    if (filteredQuestionnaire) {
                        this.searchAllList.hwQuestionnaireList = filteredQuestionnaire;
                        this.searchAllList.hwQuestionList = data.hwQuestionList.filter(item => item.questionnaireId == questionnaireIdToFind);
                    }
                    console.log(this.searchAllList); //第二次 利用questionnaireId過濾數據
                })
                .catch(error => console.error('Error:', error));
        },

        goToPreviewPage() {
            // 檢查是否有必填未填寫
            const requiredQuestions = this.searchAllList.hwQuestionList.filter(question => question.necessary);

            // 遍歷必填問題，檢查是否至少有一個選項被選中
            const unfilledRequiredQuestions = requiredQuestions.filter(question => {
                if (question.questionType === 'text') {
                    return !this.doquestArr[question.questionId]; // 如果填空題的答案為空，回傳 true
                } else if (question.questionType === 'radio') {
                    return !this.doquestArr[question.questionId]; // 如果單選題未選中，回傳 true
                } else if (question.questionType === 'checkbox') {
                    // 檢查至少有一個選項被選中
                    const options = question.optionText.split(';');
                    return !options.some(option => this.doquestArr[question.questionId + '_' + options.indexOf(option)]);
                }
                return false;
            });

            // 如果有未填寫的必填問題，顯示提示或阻止提交
            if (unfilledRequiredQuestions.length > 0) {
                alert('請填寫所有必填問題！');
                // 或是其他提示或阻止送出的操作
            } else {
                // 所有必填問題都已填寫，可以進行送出資料的操作
                this.page = 2
            }
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
                <div class="formField">
                    <label for="name">姓名</label>
                    <input type="text" id="name" v-model="doquestArr.name">
                </div>
                <div class="formField">
                    <label for="phone">手機</label>
                    <input type="text" id="phone" v-model="doquestArr.phoneNumber">
                </div>
                <div class="formField">
                    <label for="email">Email</label>
                    <input type="text" id="email" v-model="doquestArr.email">
                </div>
                <div class="formField">
                    <label for="age">年齡</label>
                    <input type="text" id="age" v-model="doquestArr.age">
                </div>
            </div>
            <div class="fluidQuest">
                <div class="questionSection" v-for="(question, index) in searchAllList.hwQuestionList" :key="index">
                    <div class="questionContainer">
                        <label>問題 {{ index + 1 }}: {{ question.questionText }}</label>
                        <span class="requiredIndicator" v-if="question.necessary == 1">*</span>
                    </div>
                    <div class="inputOptions" v-if="question.questionType === 'radio'">
                        <div v-for="(option, optionIndex) in question.optionText.split(';')" :key="optionIndex">
                            <input type="radio" :id="'q_' + index + '_o_' + optionIndex" :value="option"
                                :name="'question_' + index" v-model="doquestArr[question.questionId]">
                            <label :for="'q_' + index + '_o_' + optionIndex">{{ option }}</label>
                        </div>
                    </div>
                    <div class="inputOptions" v-else-if="question.questionType === 'checkbox'">
                        <div v-for="(option, optionIndex) in question.optionText.split(';')" :key="optionIndex">
                            <input type="checkbox" :id="'q_' + index + '_o_' + optionIndex" :value="option"
                                v-model="doquestArr[question.questionId + '_' + optionIndex]">
                            <label :for="'q_' + index + '_o_' + optionIndex">{{ option }}</label>
                        </div>
                    </div>
                    <div class="inputOptions" v-else-if="question.questionType === 'text'">
                        <input type="text" v-model="doquestArr[question.questionId]">
                    </div>
                </div>
                <button class="previewButton" @click="goToPreviewPage">預覽填寫結果</button>
                <a href="/questFrontHome"><button class="backToHome" >返回前台列表</button></a>
            </div>
        </div>
        <div class="showPreviewPage" v-if="this.page == 2">
            <previewdoQuestPage :checkinfo="doquestArr" />
            <button class="returnButton" type="button" @click="backToQuestPage()">返回修改</button>
        </div>
    </div>
</template>





<!-- <template>
    <div class="doQuestPageBody">
        <div class="doQuestHeader">
            <span>{{ searchAllList.hwQuestionnaireList.startTime }}~~{{ searchAllList.hwQuestionnaireList.endTime }}</span>
            <h6>問卷名稱:{{ searchAllList.hwQuestionnaireList.questionName }}</h6>
            <h6>問卷描述:{{ searchAllList.hwQuestionnaireList.description }}</h6>
        </div>
        <div class="backToFix" v-if="this.page == 1">
            <div class="fixedQuest">
                <div>
                    <label for="name">姓名</label>
                    <input type="text" id="name" v-model="doquestArr.name">
                </div>
                <div>
                    <label for="phone">手機</label>
                    <input type="text" id="phone" v-model="doquestArr.phoneNumber">
                </div>
                <div>
                    <label for="email">Email</label>
                    <input type="text" id="email" v-model="doquestArr.email">
                </div>
                <div>
                    <label for="age">年齡</label>
                    <input type="text" id="age" v-model="doquestArr.age">
                </div>
            </div>


            <div class="fluidQuest">
                <div v-for="(question, index) in searchAllList.hwQuestionList" :key="index">
                    <label>問題 {{ index + 1 }}: {{ question.questionText }}</label>
                    <span style="color: red;" v-if="question.necessary == 1">*</span>
                    <div v-if="question.questionType === 'radio'">
                        <div v-for="(option, optionIndex) in question.optionText.split(';')" :key="optionIndex">
                            <input type="radio" :id="'q_' + index + '_o_' + optionIndex" :value="option"
                                :name="'question_' + index" v-model="doquestArr[question.questionId]">
                            <label :for="'q_' + index + '_o_' + optionIndex">{{ option }}</label>
                        </div>
                    </div>

                    <div v-else-if="question.questionType === 'checkbox'">
                        <div v-for="(option, optionIndex) in question.optionText.split(';')" :key="optionIndex">
                            <input type="checkbox" :id="'q_' + index + '_o_' + optionIndex" :value="option"
                                v-model="doquestArr[question.questionId + '_' + optionIndex]">
                            <label :for="'q_' + index + '_o_' + optionIndex">{{ option }}</label>
                        </div>
                    </div>

                    <div v-else-if="question.questionType === 'text'">
                        <input type="text" v-model="doquestArr[question.questionId]">
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
</template> -->

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

    .backToFix {
        .fixedQuest {
            width: 900px;
            height: auto;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 10px;
            margin-bottom: 20px;
            background-color: #fff;

            .formField {
                display: flex;
                align-items: center;
                margin: 10px 0;

                label {
                    width: 100px;
                    font-weight: bold;
                }

                input {
                    flex: 0.95;
                    border-radius: 5px;
                }
            }
        }

        .fluidQuest {
            width: 900px;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
            background-color: #fff;

            .questionSection {
                .questionContainer {
                    label {
                        font-weight: bold;
                    }

                    .requiredIndicator {
                        color: red;
                    }
                }

                .inputOptions {
                    input[type="radio"] {
                        margin-right: 10px;
                    }

                    input[type="checkbox"] {
                        margin-right: 10px;
                    }
                }
            }

            .previewButton {
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

            .backToHome{
                margin-left: 600px;
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
    }

    .showPreviewPage {
        position: relative;
        .returnButton {
            position: absolute;
            bottom: 20px;
            left: 20px;
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
}
</style>

