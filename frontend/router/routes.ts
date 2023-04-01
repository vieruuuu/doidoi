import type { RouteRecordRaw } from "vue-router";

import DefaultLayout from "@/layouts/Default.vue";
import AuthLayout from "@/layouts/Auth.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: () => import("@/pages/Home/Home.vue"),
        alias: "/",
      },
    ],
  },

  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        component: () => import("@/pages/Login.vue"),
        alias: "/login",
      },
      {
        path: "register",
        component: () => import("@/pages/Register.vue"),
        alias: "/register",
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("@/pages/Error404.vue"),
  },
] satisfies Readonly<RouteRecordRaw[]>;

export default routes;
