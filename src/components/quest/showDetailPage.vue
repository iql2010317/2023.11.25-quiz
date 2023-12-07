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
            processedUserData: null
        };
    },


    async mounted() {
        try {
            await this.questionnaireInfo();
            // 在此处处理异步操作完成后的逻辑
        } catch (error) {
            console.error('Error:', error);
        }
    },



    methods: {

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

                // // 生成随机颜色函数
                // function getRandomColor() {
                //     const letters = '0123456789ABCDEF';
                //     let color = '#';
                //     for (let i = 0; i < 6; i++) {
                //         color += letters[Math.floor(Math.random() * 16)];
                //     }
                //     return color;
                // }

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
            } catch (error) {
                console.error('Error:', error);
            }
        },
    }
};
</script>

<template>
    <div class="chartBody">
        <div class="showDetailPageHeader">
            <span>{{ searchAllList.hwQuestionnaireList.startTime }}~~{{ searchAllList.hwQuestionnaireList.endTime }}</span>
            <h6>問卷名稱:{{ searchAllList.hwQuestionnaireList.questionName }}</h6>
            <h6>問卷描述:{{ searchAllList.hwQuestionnaireList.description }}</h6>
        </div>

        <div class="chart">
            <div v-for="(question, questionIndex) in this.searchAllList.hwQuestionList" :key="questionIndex">
                <div>{{ question.questionText }}</div>
                <canvas :id="'myChart_' + questionIndex"></canvas>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.chartBody {
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
}
</style>