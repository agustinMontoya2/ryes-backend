import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  {
    name: "typescript/parser-and-rules",
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "unused-imports": unusedImports,
    },
    rules: {
      ...tseslint.configs.recommended.rules,

      // Convención `import type`: SIN regla de lint a propósito.
      // Las clases usadas como DI tokens (controllers inyectando un provider)
      // requieren value import para emitir design:paramtypes correcto en Nest.
      "@typescript-eslint/consistent-type-imports": "off",

      // Nunca `any`.
      "@typescript-eslint/no-explicit-any": "error",

      // Reemplazo de no-unused-vars por eslint-plugin-unused-imports
      // (borra imports con --fix).
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],

      // Naming: PascalCase para tipos/clases; camelCase (con `_` inicial
      // permitido) para propiedades, parámetros y variables.
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "typeLike", format: ["PascalCase"] },
        { selector: "classProperty", format: ["camelCase"], leadingUnderscore: "allow" },
        { selector: "parameter", format: ["camelCase"], leadingUnderscore: "allow" },
        { selector: "variable", format: ["camelCase", "UPPER_CASE"], leadingUnderscore: "allow" },
      ],

      // Orden de miembros dentro de la clase (sin autofix; reorden manual).
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: {
            order: "as-written",
            memberTypes: [
              "signature",
              "public-static-field",
              "protected-static-field",
              "private-static-field",
              "public-readonly-field",
              "public-field",
              "protected-readonly-field",
              "protected-field",
              "private-readonly-field",
              "private-field",
              "constructor",
              "public-static-method",
              "protected-static-method",
              "private-static-method",
              "public-get",
              "public-set",
              "protected-get",
              "protected-set",
              "private-get",
              "private-set",
              "public-method",
              "protected-method",
              "private-method",
            ],
          },
        },
      ],
    },
  },
];
