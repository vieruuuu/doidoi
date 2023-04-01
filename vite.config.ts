import { resolve } from "path";

import unpluginAutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import ViteRestart from "vite-plugin-restart";
import Markdown from "vite-plugin-vue-markdown";
import tsconfigPaths from "vite-tsconfig-paths";

import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
    optimizeDeps: {
      include: [
        "firebase/functions",
        "firebase/firestore/lite",
        "firebase/app",
        "firebase/auth",
        "vue-chartjs",
        "firebase/storage",
        "zod",
        "validator/es/lib/isEmail",
        "validator/es/lib/isMobilePhone",
      ],
    },
    server: {
      host: true,
      port: 4444,
      open: "http://localhost:4444",
    },
    publicDir: "frontend/public",
    build: {
      emptyOutDir: true,
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          dir: "frontend/dist",
        },
      },
    },
    plugins: [
      tsconfigPaths(),
      vue({
        include: [/\.vue$/, /\.md$/],
        template: { transformAssetUrls },
      }),
      Markdown(),
      createHtmlPlugin({
        minify: true,
      }),
      unpluginAutoImport({
        dts: "frontend/auto-imports.d.ts",
        vueTemplate: true,
        include: [
          /\.js$/,
          /\.ts$/,
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],

        imports: [
          // presets
          "vue",
          "vue-router",
          "quasar",
        ],
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-imports.json",
          globalsPropValue: true,
        },

        dirs: [
          resolve(__dirname, "./frontend/store"),
          resolve(__dirname, "./frontend/helpers"),
        ],
      }),
      quasar({
        sassVariables: "frontend/css/quasar-variables.scss",
      }),
      ViteRestart({
        restart: ["frontend/store/*.ts", "frontend/helpers/*.ts"],
      }),
    ],
  };
});
