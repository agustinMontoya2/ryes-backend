import base from "./eslint/base.mjs";
import typescript from "./eslint/typescript.mjs";
import imports from "./eslint/imports.mjs";

export default [
  {
    ignores: ["dist/", "node_modules/", "coverage/", "eslint.config.*"],
  },
  ...base,
  ...typescript,
  ...imports,
];
