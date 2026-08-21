import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["eslint", "typescript", "unicorn", "oxc"],
  categories: {
    correctness: "error",
  },
  options: {
    typeAware: true,
  },
  overrides: [
    {
      // `describe`/`it` from `node:test` return promises that the runner awaits itself.
      files: ["test/**/*.ts"],
      rules: {
        "typescript/no-floating-promises": "off",
      },
    },
  ],
});
