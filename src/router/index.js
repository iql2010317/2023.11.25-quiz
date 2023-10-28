import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import('../views/HomeView.vue')
    },

    {
      path: "/V50",
      name: "V50",
      component: () => import('../views/V50.vue'),
    },
    {
      path: "/ARAM",
      name: "ARAM",
      component: () => import('../components/ARAM.vue'),
    },
    {
      path: "/i2",
      name: "i2",
      component: () => import('../components/i2.vue'),
    },
    {
      path: "/iframe",
      name: "iframe",
      component: () => import('../components/iframe.vue'),
    },
    {
      path: "/ProvideAndInject",
      name: "ProvideAndInject",
      component: () => import('../components/ProvideAndInject.vue'),
    },
    {
      path: "/Emit",
      name: "Emit",
      component: () => import('../components/Emit.vue'),
    },

    {
      path: "/Vif&show",
      name: "Vif&show",
      component: () => import('../views/Vif&show.vue'),
    },
    {
      path: "/ExpenseTracker",
      name: "ExpenseTracker",
      component: () => import('../components/ExpenseTracker.vue'),
    },
    {
      path: "/props",
      name: "props",
      component: () => import('../components/Props.vue'),
    },

    {
      path: "/Vhouse",
      name: "Vhouse",
      component: () => import('../views/Vhouse.vue'),
      children: [
        {
          path: "home",
          component: () => import('../components/VhouseHome.vue'),
        },
        {
          path: "toiawase",
          component: () => import('../components/toiawase.vue'),
        },
        {
          path: "sagasu",
          component: () => import('../components/sagasu.vue'),
        },
        {
          path: "sagasu/toshin",
          component: () => import('../components/toshin.vue'),
        },
        {
          path: "sagasu/toshin/Detail/A",
          component: () => import('../components/BukkenDetail.vue'),
        },
        {
          path: "sagasu/toshin/Detail/B",
          component: () => import('../components/BukkenDetailB.vue'),
        },
        {
          path: "sagasu/toshin/Detail/C",
          component: () => import('../components/BukkenDetailC.vue'),
        },
        {
          path: "sagasu/toshin/Detail/D",
          component: () => import('../components/BukkenDetailD.vue'),
        },
        {
          path: "login",
          component: () => import('../components/login.vue'),
        },
        {
          path: "login/PersonalPage",
          component: () => import('../components/PersonalPage.vue'),
        },
      ]
    },

  ],
});

export default router;
