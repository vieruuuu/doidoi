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
  scrollBehavior: (to) =>
    new Promise((resolve) => {
      if (to.hash) {
        if (!document.getElementById(to.hash.slice(1))) {
          return setTimeout(async () => {
            // 100 => 10 seconds
            const MAX_WAIT = 100;

            for (let i = 0; i < MAX_WAIT; ++i) {
              await sleep(100);

              if (document.getElementById(to.hash.slice(1))) {
                return resolve({ el: to.hash, behavior: "smooth", top: 50 });
              }
            }

            return resolve({ left: 0, top: 0 });
          }, 1);
        }

        return resolve({ el: to.hash, behavior: "smooth", top: 50 });
      }

      return resolve({ left: 0, top: 0 });
    }),
});

Router.beforeEach(() => {
  // ii dau stop daca ii deja pornita animatia de loading
  stopLoading();
  // afisez animatia de loading din partea de sus a paginii inainte de toate
  startLoading();
});

Router.afterEach(stopLoading);

export { Router };
