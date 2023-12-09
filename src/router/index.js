import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },

    //後台link
    {
      path: "/questHome",
      name: "questHome",
      component: () => import("../components/quest/questHome.vue"),
    },

    //前台link
    {
      path: "/questFrontHome",
      name: "questFrontHome",
      component: () => import("../components/quest/questFrontHome.vue"),
    },

    //測試1
    {
      path: "/surveyTest1",
      name: "surveyTest1",
      component: () => import("../components/quest/surveyTest1.vue"),
    },

    //測試2
    {
      path: "/surveyTest2",
      name: "surveyTest2",
      component: () => import("../components/quest/surveyTest2.vue"),
    },

    //新增問卷link
    {
      path: "/questHome/createQuestPage",
      name: "questHome/createQuestPage",
      component: () => import("../components/quest/createQuestPage.vue"),
    },

    //動態路由1 填寫畫面
    {
      path: "/questHome/doQuestPage/:wantId",
      name: "questHome/doQuestPage",
      component: () => import("../components/quest/doQuestPage.vue"),
    },

    //動態路由2 觀看統計畫面
    {
      path: "/questHome/showDetailPage/:showDetailPageId",
      name: "questHome/showDetailPage",
      component: () => import("../components/quest/showDetailPage.vue"),
    },
    //動態路由2-1 觀看統計畫面forBE
    {
      path: "/questHome/showDetailPageBE/:showDetailPageId",
      name: "questHome/showDetailPageBE",
      component: () => import("../components/quest/showDetailPageBE.vue"),
    },

    //動態路由3 更新新增問卷畫面
    {
      path: "/questHome/updateQuestPage/:updateQuestPageId",
      name: "questHome/updateQuestPage",
      component: () => import("../components/quest/updateQuestPage.vue"),
    },
  ],
});

export default router;
