<script>
import Chart from 'chart.js/auto';

export default {
    data() {
        return {
            searchAllList: {
                hwQuestionnaireList: [],
                hwQuestionList: []
            },
            chartDataList: [],
            labelForAns: [], ////到時候要棄用
            responseData: null,
            processedUserData: null,
            userList: null,
            processedData: null,
            selectedUserIndex: null,
            showEachUserAnswerReview: false,
            showingChart: true, // 預設顯示圖表
            showingList: false,   // 預設不顯示列表
            userListR: [], // 创建一个反转后的用户列表

            currentPage: 1,
            itemsPerPage: 4,
            pagination: {
                startIndex: 0,
                endIndex: 3 // itemsPerPage - 1
            },

        };
    },


    async mounted() {
        try {
            await this.questionnaireInfo();
            // 在此处处理异步操作完成后的逻辑
            this.reverseUserList();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    computed: {
        /////
        displayedUsers() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.userListR.slice(start, end);
        },

        totalPages() {
            return Math.ceil(this.userListR.length / this.itemsPerPage);
        }

    },

    methods: {
        changePage(pageNumber) {
            this.currentPage = pageNumber;
            this.pagination.startIndex = (pageNumber - 1) * this.itemsPerPage;
            this.pagination.endIndex = pageNumber * this.itemsPerPage - 1;
        },

        /////
        showUserAnswers(index) {
            if (index >= 0 && index < this.userListR.length) {
                const displayedIndex = index - (this.currentPage - 1) * this.itemsPerPage;
                if (displayedIndex >= 0 && displayedIndex < this.displayedUsers.length) {
                    this.selectedUserIndex = displayedIndex;
                    this.showEachUserAnswerReview = true;
                }
            }
        },



        formatDateTime(dateTimeString) {
            const [date, time] = dateTimeString.split('T');
            const formattedDate = date.split('-').join('/');
            const formattedTime = time.slice(0, 5); // 可根据需要自定义时间格式
            return `${formattedDate} ${formattedTime}`;
            return formatDateTime(dateTimeString);
        },


        reverseUserList() {
            this.userListR = this.userList.slice().reverse();
        },

        showChart() {
            this.showingChart = true;
            this.showingList = false;
            this.questionnaireInfo();
        },
        showList() {
            this.showingChart = false;
            this.showingList = true;
        },

        back() {
            this.showEachUserAnswerReview = false
        },



        async questionnaireInfo() {
            try {
                const questionnaireIdToFind = this.$route.params.showDetailPageId;

                const response1 = await fetch('http://localhost:8080/api/HwQuestionnaire/search', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response1.ok) {
                    throw new Error(`HTTP error! Status: ${response1.status}`);
                }

                const data1 = await response1.json();



                const filteredQuestionnaire = data1.hwQuestionnaireList.find(item => item.questionnaireId == questionnaireIdToFind);
                let filteredQuestionList = [];

                if (filteredQuestionnaire) {

                    this.searchAllList.hwQuestionnaireList = filteredQuestionnaire;
                    this.searchAllList.hwQuestionList = data1.hwQuestionList.filter(item => item.questionnaireId == questionnaireIdToFind);


                    filteredQuestionList = data1.hwQuestionList.filter(item => item.questionnaireId == questionnaireIdToFind);
                }

                let xLabelsMap = {};

                filteredQuestionList.forEach(question => {
                    const questionId = question.questionId;
                    const optionTexts = question.optionText.split(';');
                    xLabelsMap[questionId] = optionTexts;
                });


                const response2 = await fetch(`http://localhost:8080/api/user/searchByQuestionnaireId?questionnaireId=${questionnaireIdToFind}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response2.ok) {
                    throw new Error(`HTTP error! Status: ${response2.status}`);
                }

                const data2 = await response2.json();
                console.log(data2)
                this.userList = data2.userList

                let answerCounts = {};

                data2.userList.forEach(question => {
                    const eachAns = question.ans.split('；');

                    eachAns.forEach(answer => {
                        const trimmedAnswers = answer.trim().split(';');

                        trimmedAnswers.forEach(trimmedAnswer => {
                            if (!answerCounts[trimmedAnswer]) {
                                answerCounts[trimmedAnswer] = 0;
                            }
                            answerCounts[trimmedAnswer]++;
                        });
                    });
                });


                const xLabelsMapValues = Object.values(xLabelsMap);

                console.log(answerCounts);
                console.log(xLabelsMapValues);
                // 构建三个数组，根据 answerCounts 和 xLabelsMapValues 的对应值
                const resultArrays = xLabelsMapValues.map(labels =>
                    labels.map(label => answerCounts[label])
                );

                console.log(resultArrays); ////這裡是答題次數

                // 固定的顏色陣列
                // const predefinedColors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333'];
                const predefinedColors = [
                    '#FF9999', // 深紅色
                    '#FFFF99', // 深黃色
                    '#9999FF', // 深藍色
                    '#99FF99', // 深綠色
                    '#FFB366', // 深橘色
                    '#FF99FF', // 深紫色
                    '#66FFFF', // 深青色
                    '#B366FF', // 深紫色
                ];


                // 生成动态的统计数据
                resultArrays.forEach((data, index) => {
                    const labels = xLabelsMapValues[index]; // 获取对应的标签
                    // const backgroundColors = Array.from({ length: labels.length }, () => getRandomColor()); // 获取随机颜色
                    const backgroundColors = predefinedColors.slice(0, labels.length); // 使用固定的顏色
                    this.chartDataList.push({
                        labels: labels,
                        datasets: [
                            {
                                label: `Sample Question ${index + 1}`,
                                data: data,
                                backgroundColor: backgroundColors,
                                borderColor: backgroundColors.map(color => `${color}CC`), // 添加透明度
                                borderWidth: 1,
                            },
                        ],
                    });
                });

                // 使用$nextTick确保DOM更新后再渲染图表
                this.$nextTick(() => {
                    this.chartDataList.forEach((chartData, chartIndex) => {
                        const ctx = document.getElementById(`myChart_${chartIndex}`);
                        new Chart(ctx, {
                            type: 'doughnut',
                            data: chartData,
                            options: {
                                // 根据需要配置选项
                            },
                        });
                    });
                });

                console.log(this.userList)
                console.log(xLabelsMapValues)


                const processedData = this.userList.map(user => {
                    const answers = user.ans.split(';').map((answer, index) => {
                        const questionIndex = xLabelsMapValues.findIndex(arr => arr.includes(answer)) + 1;
                        return {
                            question: questionIndex,
                            response: answer
                        };
                    });

                    // 將一樣問題的 response 用 (、) 連接
                    const groupedAnswers = answers.reduce((acc, curr) => {
                        const existing = acc.find(item => item.question === curr.question);
                        if (existing) {
                            existing.response += `、${curr.response}`;
                        } else {
                            acc.push(curr);
                        }
                        return acc;
                    }, []);

                    return { answers: groupedAnswers };
                });

                console.log(processedData);
                this.processedData = processedData






            } catch (error) {
                console.error('Error:', error);
            }
        },

    },

};
</script>

<template>
    <div class="detailBody">
        <div class="showDetailPageHeader">
            <span>{{ searchAllList.hwQuestionnaireList.startTime }}~~{{ searchAllList.hwQuestionnaireList.endTime }}</span>
            <h6>問卷名稱:{{ searchAllList.hwQuestionnaireList.questionName }}</h6>
            <h6>問卷描述:{{ searchAllList.hwQuestionnaireList.description }}</h6>
        </div>

        <div class="tabButtons">
            <button @click="showChart">觀看圖表</button>
            <button @click="showList">觀看列表</button>
        </div>

        <div class="chart" v-if="showingChart">
            <div v-for="(question, questionIndex) in this.searchAllList.hwQuestionList" :key="questionIndex">
                <div>{{ question.questionText }}</div>
                <canvas :id="'myChart_' + questionIndex"></canvas>
            </div>
        </div>


        <!--這裡-->
        <div class="userListBody" v-if="showingList">
            <div class="usertable">
                <table>
                    <thead>
                        <tr>
                            <th>編號</th>
                            <th>姓名</th>
                            <th>填寫時間</th>
                            <th>觀看回覆</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in displayedUsers" :key="user.numId">
                            <td>{{ displayedUsers.length - index }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ formatDateTime(user.dateTime) }}</td>
                            <td>
                                <!-- 通过索引（index）和当前页码（currentPage）来计算正确的位置 -->
                                <button @click="showUserAnswers(index + (currentPage - 1) * itemsPerPage)">
                                    前往
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <button v-for="pageNumber in totalPages" :key="pageNumber" @click="changePage(pageNumber)">
                    {{ pageNumber }}
                </button>
            </div>

        </div>

        <div class="overlay" v-if="showEachUserAnswerReview" @click="back()"></div>

        <div class="EachUserAnswerReview" v-if="showEachUserAnswerReview">


            <!--這裡-->
            <table class="userInfoTable">
                <tbody>
                    <tr>
                        <td>姓名：</td>
                        <td>{{ displayedUsers[selectedUserIndex].name }}</td>
                        <td>年齡：</td>
                        <td>{{ displayedUsers[selectedUserIndex].age }}</td>
                    </tr>
                    <tr>
                        <td>電話：</td>
                        <td>{{ displayedUsers[selectedUserIndex].phoneNumber }}</td>
                        <td>信箱：</td>
                        <td>{{ displayedUsers[selectedUserIndex].email }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="LeftRight">
                <table class="qListTable">
                    <thead>
                        <tr>
                            <th>題目</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in searchAllList.hwQuestionList" :key="'question_' + index">
                            <td>{{ item.questionText }}</td>
                        </tr>
                    </tbody>
                </table>

                <table class="userAnswerTable">
                    <thead>
                        <tr>
                            <th>答案</th>
                        </tr>
                    </thead>
                    <tbody v-if="selectedUserIndex !== null">
                        <tr v-for="(answer, index) in processedData[selectedUserIndex].answers" :key="'answer_' + index">
                            <td>
                                Question {{ answer.question }}: {{ answer.response }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.detailBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .showDetailPageHeader {
        width: 900px;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 20px;
        background-color: #fff;
    }

    .chart {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 800px;
        padding: 20px;
        background-color: #f8f8f8;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

        canvas {
            width: 400;
            height: 450px;
            margin-bottom: 20px;
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    }


    .userListBody {
        width: 900px;
        height: 400px;
        border: 1px solid #ccc;
        border-radius: 10px;
        // overflow: auto;
        background-color: #fff;

        .usertable {
            width: 900px;
            height: 338px;
            border: 1px solid #ccc;
            border-radius: 10px;
            background-color: #fff;


            table {
                width: 100%;
                border-collapse: collapse;
                border-spacing: 0;
            }

            th,
            td {
                border: 1px solid #ccc;
                padding: 10px;
                text-align: center;
            }

            th {
                background-color: #BAE8CA;
                color: black;
            }

            tr:nth-child(even) {
                background-color: #BBFFD8;
            }
        }

        .pagination {
            display: flex;
            justify-content: center;
        }
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        /* 半透明黑色背景 */
        z-index: 1;
        /* 放置於下方 */
    }


    .EachUserAnswerReview {
        // display: flex;
        // margin-top: 100px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        width: 900px;
        height: 60vh;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        z-index: 2;

        .userInfoTable {
            width: 100%;
            margin-bottom: 20px;

            td {
                width: 25%;
                /* 四個欄位均分寬度 */
                text-align: left;
                padding: 8px;
                border: 1px solid #ccc;
            }

            /* 隔行變色 */
            tr:nth-child(even) {
                background-color: #f8f8f8;
            }
        }

        .LeftRight {
            display: flex;


            .qListTable,
            .userAnswerTable {
                flex: 1;
                /* 均分空間 */
                margin-right: 20px;
                /* 調整間距 */
            }

        }

    }


}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #4CAF50;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    transition-duration: 0.4s;
}

button:hover {
    background-color: #45a049;
}
</style>