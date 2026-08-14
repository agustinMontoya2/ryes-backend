import importPlugin from "eslint-plugin-import";

export default [
  {
    name: "imports/order-and-analysis",
    files: ["**/*.ts"],
    plugins: { import: importPlugin },
    settings: {
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
        node: true,
      },
      "import/parsers": { "@typescript-eslint/parser": [".ts"] },
    },
    rules: {
      "import/no-unresolved": "error",
      "import/no-duplicates": "error",
      "import/no-cycle": ["error", { maxDepth: 20, ignoreExternal: true }],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          pathGroups: [
            { pattern: "@common/**", group: "internal", position: "before" },
            { pattern: "@common", group: "internal", position: "before" },
          ],
          pathGroupsExcludedImportTypes: ["builtin", "object", "type"],
        },
      ],
    },
  },
];
