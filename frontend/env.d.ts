import { Router, RouteLocationNormalizedLoaded } from "vue-router";

import { useQuasar } from "quasar";

declare module "vue" {
  interface ComponentCustomProperties {
    $router: Router;
    $route: RouteLocationNormalizedLoaded;
    $q: ReturnType<typeof useQuasar>;
  }
}

declare module "quasar" {
  interface QUploader {
    files: readonly (File & {
      __key: string;
      __img: {
        src: string;
      };
    })[];
  }
}
