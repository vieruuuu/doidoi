// used to build functions
import { defineConfig } from "rollup";

import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  external: [
    "firebase-functions",
    "firebase-admin/app",
    "firebase-admin/auth",
    "firebase-admin/firestore",
    "firebase-admin/storage",
    "zod",
    "node-fetch",
    "@google-cloud/vision",
  ],
  output: {
    dir: "functions/dist",
    format: "module",
    sourcemap: true,
  },
  input: "functions/functions.ts",
  plugins: [
    typescript({
      tsconfig: "functions/tsconfig.json",
    }),
    json(),
    commonjs(),
    nodeResolve({ preferBuiltins: true }),
  ],
  watch: {
    clearScreen: false,
  },
});
