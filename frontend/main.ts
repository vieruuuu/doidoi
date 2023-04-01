import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

import "./css/app.scss";

import { createPinia } from "pinia";
import {
  Dialog,
  Loading,
  LoadingBar,
  LocalStorage,
  Notify,
  Quasar,
} from "quasar";
import { createApp } from "vue";

import App from "./App.vue";
import { loginHook } from "./lib/firebase";
import { Router } from "./router";

const app = createApp(App);

app.use(createPinia());

app.use(Router);

app.use(Quasar, {
  plugins: { Dialog, Notify, Loading, LocalStorage, LoadingBar },
  components: {},

  config: {
    loadingBar: {
      color: "primary",
    },
  },
});

loginHook();

app.mount("#app");
