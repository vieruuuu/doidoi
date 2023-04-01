module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    "vue/setup-compiler-macros": true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",

    "prettier",

    "./.eslintrc-auto-imports.json",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaVersion: "latest",
  },
  plugins: [],
  rules: {
    // allow debugger during development only
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // FIXME: din ceva motiv da eroare cu typescript type casting
    "vue/valid-v-model": "off",
    "vue/multi-word-component-names": "off",
    "vue/require-default-prop": "off",
  },
};
