import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ["jest.config.js"], // Configurações específicas para arquivos CommonJS
    languageOptions: {
      globals: globals.node, // Usa o ambiente Node.js, que define o module
    },
    rules: {
      "no-undef": "off", // Desativa a regra no-undef para este arquivo
    },
  },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  prettierConfig, // Desativa as regras que conflitam com Prettier
  {
    plugins: {
      prettier,
    },
  },
];
