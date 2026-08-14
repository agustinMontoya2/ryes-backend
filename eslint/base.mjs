import globals from "globals";

export default [
  {
    name: "base/general",
    files: ["**/*.ts"],
    languageOptions: {
      globals: { ...globals.node, ...globals.jest, ...globals.es2021 },
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];
