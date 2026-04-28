import { createRequire } from "node:module";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const require = createRequire(import.meta.url);

const eslintConfig = defineConfig([
  ...nextVitals,
  // Extend the custom .eslintrc.cjs config to disable 'jsx-quotes'.
  require("./.eslintrc.cjs"),
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
