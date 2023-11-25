<script>
import Chart from 'chart.js/auto';

export default {
    data() {
        return {
            questArrLocal: JSON.parse(localStorage.getItem("questArrLocal")) || [],
            //第一題的chartData
            chartData: {
                
                labels: ['100元', '150元', '200元', '250元'],
                datasets: [{
                    label: '/次',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.4)',    // Red with transparency
                        'rgba(54, 162, 235, 0.4)',    // Blue with transparency
                        'rgba(255, 206, 86, 0.4)',    // Yellow with transparency
                        'rgba(75, 192, 192, 0.4)'     // Teal with transparency
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',      // Solid red
                        'rgba(54, 162, 235, 1)',      // Solid blue
                        'rgba(255, 206, 86, 1)',      // Solid yellow
                        'rgba(75, 192, 192, 1)'       // Solid teal
                    ],

                    borderWidth: 1
                }]
            },
            //第二題的chartData
            chartData1: {
                labels: ['A', 'B', 'C'],
                datasets: [{
                    label: '/次',
                    data: [], //更改
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.4)',    // Red with transparency
                        'rgba(54, 162, 235, 0.4)',    // Blue with transparency
                        'rgba(255, 206, 86, 0.4)',    // Yellow with transparency
                        'rgba(75, 192, 192, 0.4)'     // Teal with transparency
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',      // Solid red
                        'rgba(54, 162, 235, 1)',      // Solid blue
                        'rgba(255, 206, 86, 1)',      // Solid yellow
                        'rgba(75, 192, 192, 1)'       // Solid teal
                    ],
                    borderWidth: 1
                }]
            },

            //第三題的chartData
            chartData2: {
                labels: ['是', '否'],
                datasets: [{
                    label: '/次',
                    data: [], //更改
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.4)',    // Red with transparency
                        'rgba(54, 162, 235, 0.4)',    // Blue with transparency
                        'rgba(255, 206, 86, 0.4)',    // Yellow with transparency
                        'rgba(75, 192, 192, 0.4)'     // Teal with transparency
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',      // Solid red
                        'rgba(54, 162, 235, 1)',      // Solid blue
                        'rgba(255, 206, 86, 1)',      // Solid yellow
                        'rgba(75, 192, 192, 1)'       // Solid teal
                    ],
                    borderWidth: 1
                }]
            },


        };
    },
    mounted() {
        this.updateChartData(); //這個要在前面
        this.createChart(); //
        this.updateChartData1(); //這個要在前面
        this.createChart1(); //
        this.updateChartData2(); //這個要在前面
        this.createChart2(); //
    },

    methods: {

        createChart() {
            
            console.log(this.questArrLocal[0].questions[0].question); //單選一
            console.log(this.questArrLocal[0].questions[1].question); //單選二
            console.log(this.questArrLocal[0].questions[2].question); //單選三

            console.log(this.questArrLocal[0].questions[0].options[0].text); //100元
            console.log(this.questArrLocal[0].questions[0].options[1].text); //150元
            console.log(this.questArrLocal[0].questions[0].options[2].text); //200元
            console.log(this.questArrLocal[0].questions[0].options[3].text); //250元

            console.log(this.questArrLocal[0].questions[1].options[0].text); //A
            console.log(this.questArrLocal[0].questions[1].options[1].text); //B
            console.log(this.questArrLocal[0].questions[1].options[2].text); //C

            console.log(this.questArrLocal[0].questions[2].options[0].text); //是
            console.log(this.questArrLocal[0].questions[2].options[1].text); //否
            
            const ctx = this.$refs.myChart.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: this.chartData,
                options: {
                    scales: {
                        x: {
                            ticks: {
                                font:{
                                    size:20
                                }
                            }
                        },

                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1,
                                max: 5,
                                font:{
                                    size:20
                                }
                            }
                        }
                    }
                }
            });

            this.updateChartData();


        },
        updateChartData() {
            let selectionCounts = [0, 0, 0, 0];
            this.questArrLocal.forEach(quest => {

                quest.userResponse.forEach(response => {
                    response.userAnswer.forEach(answer => {
                        if (answer.question === '單選一') {
                            switch (answer.answers) {
                                case "100元":
                                    selectionCounts[0]++;
                                    break;
                                case '150元':
                                    selectionCounts[1]++;
                                    break;
                                case '200元':
                                    selectionCounts[2]++;
                                    break;
                                case '250元':
                                    selectionCounts[3]++;
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
                });
            });

            this.chartData.datasets[0].data = selectionCounts;
        },

        createChart1() {
            const ctx1 = this.$refs.myChart1.getContext('2d');
            new Chart(ctx1, {
                type: 'bar',
                data: this.chartData1, //
                options: {
                    scales: {
                        x: {
                            ticks: {
                                font:{
                                    size:20
                                }
                            }
                        },

                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1,
                                max: 5,
                                font:{
                                    size:20
                                }
                            }
                        }
                    }
                }
            });

            this.updateChartData1();


        },
        updateChartData1() {
            let selectionCounts = [0, 0, 0];
            this.questArrLocal.forEach(quest => {
                quest.userResponse.forEach(response => {
                    response.userAnswer.forEach(answer => {
                        if (answer.question === '單選二') {
                            switch (answer.answers) {
                                case "A":
                                    selectionCounts[0]++;
                                    break;
                                case 'B':
                                    selectionCounts[1]++;
                                    break;
                                case 'C':
                                    selectionCounts[2]++;
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
                });
            });

            this.chartData1.datasets[0].data = selectionCounts;
        },
        createChart2() {
            const ctx2 = this.$refs.myChart2.getContext('2d');
            new Chart(ctx2, {
                type: 'bar',
                data: this.chartData2,
                options: {
                    scales: {
                        x: {
                            ticks: {
                                font:{
                                    size:20
                                }
                            }
                        },

                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1,
                                max: 5,
                                font:{
                                    size:20
                                }
                            }
                        }
                    }
                }
            });

            this.updateChartData2();


        },
        updateChartData2() {
            let selectionCounts = [0, 0, 0, 0];

            this.questArrLocal.forEach(quest => {
                quest.userResponse.forEach(response => {
                    response.userAnswer.forEach(answer => {
                        if (answer.question === '單選三') {
                            switch (answer.answers) {
                                case "是":
                                    selectionCounts[0]++;
                                    break;
                                case '否':
                                    selectionCounts[1]++;
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
                });
            });

            this.chartData2.datasets[0].data = selectionCounts;
        },
    }
};
</script>

<template>
    <div class="chartBody">
        <div class="chart">
            {{ this.questArrLocal[0].userResponse[0].userAnswer[0].question }}
            <canvas ref="myChart"></canvas>
            {{ this.questArrLocal[0].userResponse[0].userAnswer[1].question }}
            <canvas ref="myChart1"></canvas>
            {{ this.questArrLocal[0].userResponse[0].userAnswer[2].question }}
            <canvas ref="myChart2"></canvas>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.chartBody {
    display: flex;
    align-items: center;
    justify-content: center;
    // height: 100vh; /* Adjust the height as needed */

    .chart {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 800px;
        /* Set maximum width for responsiveness */
        padding: 20px;
        background-color: #f8f8f8;
        /* Background color for the chart container */
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        /* Box shadow for a subtle effect */

        canvas {
            margin-bottom: 20px;
            /* Add margin between charts */
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            /* Add a slight shadow to the chart */
        }
    }
}</style>