import { LoadingBar } from "quasar";
import { createRouter, createWebHistory } from "vue-router";

import routes from "./routes";

let LoadingBarTimeout: number;

function startLoading() {
  // am pus un delay de 200ms ca sa nu spameze siteul cu loadingbarul
  LoadingBarTimeout = setTimeout(
    () => LoadingBar.start(),
    200
  ) as unknown as number;
}

function stopLoading() {
  if (LoadingBarTimeout) {
    clearTimeout(LoadingBarTimeout);
  }

  LoadingBar.stop();
}

const Router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

Router.beforeEach(() => {
  // ii dau stop daca ii deja pornita animatia de loading
  stopLoading();
  // afisez animatia de loading din partea de sus a paginii inainte de toate
  startLoading();
});

Router.afterEach(stopLoading);

export { Router };
