import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js and TypeScript configs via compat
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add Prettier plugin
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error", // Show Prettier formatting issues as errors
    },
  },

  // Disable ESLint rules that conflict with Prettier
  {
    rules: prettierConfig.rules,
  },
];

export default eslintConfig;
