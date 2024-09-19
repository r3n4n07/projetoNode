import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{ts}"], // Verifica todos os arquivos TS no projeto
    languageOptions: { globals: globals.node },
    rules: {
      // Configura Prettier para rodar como uma regra do ESLint
      "prettier/prettier": "error", // Você pode trocar para "error" se quiser que o código falhe na formatação
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig, // Desativa as regras que conflitam com Prettier
  {
    plugins: {
      prettier,
    },
  },
];
