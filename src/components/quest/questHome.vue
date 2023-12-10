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
            selectedQuestionnaires: [],
            left: '<<',
            right: '>>',

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
                    console.log(data);

                    // 將數據進行倒序處理
                    const reversedQuestionnaireList = data.hwQuestionnaireList.reverse();
                    this.searchAllList.hwQuestionnaireList = reversedQuestionnaireList;

                    this.currentPage = 1;

                })
                .catch(error => console.error('Error:', error));
        },

        deleteQuestionnaireList() {

            const questionnaireIdList = this.selectedQuestionnaires

            // 檢查至少一筆
            if (questionnaireIdList.length == 0) {
                alert('刪除問卷至少大於一筆');
                return;
            }

            fetch('http://localhost:8080/api/HwQuestionnaire/deleteQuestionnaire', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(questionnaireIdList)
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

            alert('成功刪除問卷');
        },
        test() {
            console.log(this.selectedQuestionnaires)
        },

        getPage(pageNum) {
            const pageSize = 10; // 每页显示的数量
            const startIndex = (pageNum - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            return this.searchAllList.hwQuestionnaireList.slice(startIndex, endIndex);
        },
        isPublished(startTime, endTime) {
            const now = new Date();
            const start = new Date(startTime);
            const end = new Date(endTime);

            return start <= now;
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
                <label>問卷標題：</label>
                <input type="search" style="padding-left: 10px;" v-model="searchText" placeholder="請輸入搜尋標題">
            </div>
            <div class="searchListDown">
                <label for="startDate">開始日期：</label>
                <input id="startDate" class="searchStartTime" type="date" v-model="searchStartTime">

                <label for="endDate">結束日期：</label>
                <input id="endDate" class="searchEndTime" type="date" v-model="searchEndTime">
                <button class="searchButton" v-on:click="searchParam()">
                    <i class="fa-solid fa-magnifying-glass" style="margin-right: 10px;"></i>搜尋</button>
                <button><a href="/questHome/createQuestPage">新增問卷</a></button>
                <a href="/questHome"><button class="searchButton" v-on:click="deleteQuestionnaireList()">刪除問卷</button></a>

            </div>
        </div>
        <div class="showList">
            <table>
                <thead>
                    <tr>
                        <th>刪除</th>
                        <th>＃</th>
                        <th>問卷
                        </th>
                        <th>狀態</th>
                        <th>開始時間</th>
                        <th>結束時間</th>
                        <th>數據統計</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(quest, index) in getPage(currentPage)" :key="index">

                        <td>
                            <!-- 在這裡設置 checkbox，使用 v-model 綁定選中的問卷 -->
                            <input type="checkbox" :value="quest.questionnaireId" v-model="selectedQuestionnaires"
                                :disabled="quest.published == 1">
                        </td>

                        <td>{{ quest.questionnaireId }}</td>
                        <td>
                            <!-- 根据问卷发布状态决定是否显示修改链接 -->
                            <router-link v-if="quest.published == 0"
                                :to="'/questHome/updateQuestPage/' + quest.questionnaireId">
                                {{ quest.questionName }}
                            </router-link>
                            <span v-else>
                                {{ quest.questionName }}
                            </span>
                        </td>

                        <td>
                            <!-- 根據開始時間和結束時間來判斷問卷狀態 -->
                            <span v-if="quest.published == 0">未發布</span>
                            <span v-else>
                                <span
                                    v-if="isPublished(quest.startTime, quest.endTime) && getStatus(quest.startTime, quest.endTime) === '進行中'">
                                    進行中
                                </span>
                                <span v-else-if="!isPublished(quest.startTime, quest.endTime)">
                                    尚未開始
                                </span>
                                <span v-else>
                                    已結束
                                </span>
                            </span>
                        </td>

                        <td>{{ quest.startTime }}</td>
                        <td>{{ quest.endTime }}</td>
                        <td><router-link :to="'/questHome/showDetailPageBE/' + quest.questionnaireId">觀看統計</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="showPages">
            <!-- 上一页按钮 -->
            <button class="pageButton" @click="goToPreviousPage" :disabled="currentPage === 1">{{ this.left }}</button>
            <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="pageButton">
                {{ page }}
            </button>
            <!-- 下一页按钮 -->
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


    .searchList {
        margin-top: 15px;
        background-color: #FFE9D2;
        /* 淡橘色 */
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
                background-color: #FF8C00;
                /* 深橘色 */
                // border: 1px solid #3a9e5f;
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
        // overflow: auto;
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
            background-color: #FFDAB9;
            /* 淡橘色 */
            color: black;
        }

        tr:nth-child(even) {
            background-color: #FFE9D2;
            /* 淡橘色 */
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

@media screen and (max-width: 1250px) {

    .questHomeBody {

        .searchList,
        .showList {
            width: 600px;
        }
    }

    .questHomeBody {

        .showList table th:nth-child(5),
        .showList table td:nth-child(5),
        .showList table th:nth-child(6),
        .showList table td:nth-child(6) {
            display: none;
        }

        .searchListDown label {
            display: none;
        }
    }

    .showPages {
        margin-right: 30px;
    }
}
</style>
