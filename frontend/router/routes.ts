import type { RouteRecordRaw } from "vue-router";

import DefaultLayout from "@/layouts/Default.vue";
import AuthLayout from "@/layouts/Auth.vue";

const routes = [
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        path: "login",
        component: () => import("@/pages/Login.vue"),
        alias: "/",
      },
      {
        path: "register",
        component: () => import("@/pages/Register.vue"),
        alias: "/register",
      },
    ],
  },

  {
    path: "/reports",
    component: DefaultLayout,
    children: [{ path: "", component: () => import("@/pages/Home/Home.vue") }],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("@/pages/Error404.vue"),
  },
] satisfies Readonly<RouteRecordRaw[]>;

export default routes;
