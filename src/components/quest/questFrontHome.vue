<script>
export default {
    data() {
        return {
            searchAllList: {
                hwQuestionnaireList: [],
                hwQuestionList: []
            },
            searchText: '',
            searchStartTime: '',
            searchEndTime: '',
            currentPage: 1,// 初始化当前页数为1

            sortKey: '', // 預設的排序欄位
            sortOrders: {
                // 每個欄位的排序順序
                'num': 1,
                'questionName': 1,
                'status': 1,
                'startTime': 1,
                'endTime': 1
            },
            left:'<<',
            right:'>>',
        };
    },
    mounted() {
        this.searchParam();
    },
    computed: {
        totalPages() {
            const pageSize = 10; // 每页显示的数量
            return Math.ceil(this.searchAllList.hwQuestionnaireList.length / pageSize);
        }
    },

    methods: {

        searchParam() {
            const questionName = this.searchText;
            const startTime = this.searchStartTime;
            const endTime = this.searchEndTime;

            const url = new URL('http://localhost:8080/api/HwQuestionnaire/searchParamTime');
            url.searchParams.append('question_name', questionName);
            url.searchParams.append('start_Time', startTime);
            url.searchParams.append('end_Time', endTime);

            fetch(url, {
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
                    const publishedQuestionnaires = data.hwQuestionnaireList.filter(questionnaire => questionnaire.published === true);

                    // 對 publishedQuestionnaires 進行倒序排列
                    const reversedPublishedQuestionnaires = publishedQuestionnaires.reverse();

                    this.searchAllList.hwQuestionnaireList = reversedPublishedQuestionnaires;
                    console.log(this.searchAllList);

                    this.currentPage = 1;


                })
                .catch(error => console.error('Error:', error));
        },


        getPage(pageNum) {
            const pageSize = 10; // 每页显示的数量
            const startIndex = (pageNum - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            return this.searchAllList.hwQuestionnaireList.slice(startIndex, endIndex);
        },
        getStatus(startTime, endTime) {
            const now = new Date();
            const startDate = new Date(startTime);
            const endDate = new Date(endTime);

            if (now < startDate) {
                return '尚未開始';
            } else if (now >= startDate && now <= endDate) {
                return '進行中';
            } else {
                return '已結束';
            }
        },
        isLinkEnabled(startTime, endTime) {
            const now = new Date();
            const startDate = new Date(startTime);
            const endDate = new Date(endTime);
            const status = this.getStatus(startTime, endTime);

            if (status === '尚未開始' || (status === '已結束' && now < endDate)) {
                return false;
            } else {
                return true;
            }
        },
        isLinkEnabledForDoPage(startTime, endTime) {
            const now = new Date();
            const startDate = new Date(startTime);
            const endDate = new Date(endTime);
            const status = this.getStatus(startTime, endTime);

            if (status === '尚未開始' || status === '已結束') {
                return false;
            }
            else {
                return true;
            }
        },

        sortBy(key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
            // 根據點擊的欄位進行排序
            this.searchAllList.hwQuestionnaireList.sort((a, b) => {
                return this.sortOrders[key] * (a[key] > b[key] ? 1 : -1);
            });
        },
        getStatusColor(startTime, endTime) {
            const status = this.getStatus(startTime, endTime);

            if (status === '尚未開始') {
                return 'orange'; // 设置尚未开始状态的文字颜色为橙色
            } else if (status === '進行中') {
                return 'green'; // 设置进行中状态的文字颜色为绿色
            } else if (status === '已結束') {
                return 'red'; // 设置已结束状态的文字颜色为红色
            } else {
                return 'black'; // 默认颜色为黑色
            }
        },
        // 上一页逻辑
        goToPreviousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        // 下一页逻辑
        goToNextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },


    }
};
</script>

<template>
    <div class="questHomeBody">
        <div class="searchList">
            <div class="searchListTop">
                <label>問卷標題(這裡是前台)</label>
                <input type="search" v-model="searchText">
            </div>
            <div class="searchListDown">
                <label for="">開始/結束</label>
                <input class="searchStartTime" type="date" v-model="searchStartTime">
                <input class="searchEndTime" type="date" v-model="searchEndTime">
                <button class="searchButton" v-on:click="searchParam()">搜尋</button>
            </div>
        </div>
        <div class="showList">
            <table>
                <thead>
                    <tr>
                        <th @click="sortBy('num')">＃</th>
                        <th @click="sortBy('questionName')">問卷(新的列表fromDB)</th>
                        <th @click="sortBy('status')">狀態</th>
                        <th @click="sortBy('startTime')">開始時間</th>
                        <th @click="sortBy('endTime')">結束時間</th>
                        <th>觀看統計</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(quest, index) in getPage(currentPage)" :key="index">
                        <td>{{ quest.questionnaireId }}</td>

                        <td>
                            <router-link v-if="isLinkEnabledForDoPage(quest.startTime, quest.endTime)"
                                :to="'/questHome/doQuestPage/' + quest.questionnaireId" class="router-link-custom">
                                {{ quest.questionName }}
                            </router-link>
                            <span v-else>{{ quest.questionName }}</span>
                        </td>

                        <td>
                            <span :style="{ color: getStatusColor(quest.startTime, quest.endTime) }">
                                {{ getStatus(quest.startTime, quest.endTime) }}
                            </span>
                        </td>

                        <td>{{ quest.startTime }}</td>
                        <td>{{ quest.endTime }}</td>

                        <td>
                            <router-link v-if="isLinkEnabled(quest.startTime, quest.endTime)"
                                :to="'/questHome/showDetailPage/' + quest.questionnaireId" class="router-link-custom">
                                觀看統計
                            </router-link>
                            <span v-else>觀看統計</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="showPages">
            <button class="pageButton" @click="goToPreviousPage" :disabled="currentPage === 1">{{ this.left }}</button>
            <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="pageButton">
                {{ page }}
            </button>
            <button class="pageButton" @click="goToNextPage" :disabled="currentPage === totalPages">{{ this.right
            }}</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.questHomeBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;
    // padding: 20px;

    .searchList {
        margin-top: 15px;
        background-color: #BBFFD8;
        width: 900px;
        border: 1px solid #ccc;
        padding: 15px;
        border-radius: 10px;

        .searchListTop {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;

            label {
                margin-right: 10px;
            }

            input[type="search"] {
                padding: 5px;
                border-radius: 5px;
                border: 1px solid #ccc;
            }
        }

        .searchListDown {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            label {
                margin-right: 10px;
            }

            input[type="date"] {
                padding: 5px;
                border-radius: 5px;
                border: 1px solid #ccc;
            }

            .searchButton {
                padding: 5px 10px;
                background-color: #55c57a;
                border: 1px solid #3a9e5f;
                border-radius: 5px;
                cursor: pointer;
                color: white;
            }

            .searchButton:hover {
                background-color: #3a9e5f;
            }

            button {
                padding: 5px 10px;
                background-color: #fff;
                border: 1px solid #ccc;
                border-radius: 5px;
                cursor: pointer;

                a {
                    text-decoration: none;
                    color: black;
                    transition: text-decoration-color 0.3s;
                    border-bottom: 1px solid transparent;
                }

                a:hover {
                    text-decoration-color: #55c57a;
                    border-bottom: 1px solid #55c57a;
                }
            }

            button:hover {
                background-color: #ccc;
            }
        }
    }

    .showList {
        margin-top: 15px;
        width: 900px;
        height: 495px;
        border: 1px solid #ccc;
        border-radius: 10px;
        overflow: auto;
        background-color: #fff;

        .router-link-custom {
            text-decoration: none;
            color: blue;
            transition: text-decoration-color 0.3s;
            border-bottom: 1px solid transparent;

            &:hover {
                text-decoration-color: blue;
                border-bottom: 1px solid blue;
            }
        }

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

    .showPages {
        display: flex;
        justify-content: center;
        margin-top: 15px;
        gap: 10px;
    }

    .pageButton {
        padding: 5px 10px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            background-color: #ccc;
        }
    }

    .pageButton:hover {
        background-color: #ccc;
    }
}
</style>
