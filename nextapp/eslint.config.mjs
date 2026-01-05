// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

export default [{
  ignores: [".next/", "node_modules/", "dist/"],
}, ...tseslint.configs.recommended, {
  plugins: {
    "@next/next": nextPlugin,
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs["core-web-vitals"].rules,
  },
}, ...storybook.configs["flat/recommended"]];
