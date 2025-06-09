// eslint.config.mjs
import globals from "globals";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";


export default [
  {
    files: ["**/*.ts", "**/*.tsx"], // Only lint TypeScript files
    ignores: [
      "dist/**",
      "node_modules/**",
      "**/*.d.ts" // Ignore TypeScript declaration files
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {  // <-- Moved project here
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json"  // Correct placement
      },
      globals: {
        ...globals.node, // Node.js globals
        ...globals.es2021, // ES2021 globals
      },
    },
    plugins: {
      "@typescript-eslint": tseslint, // Assign the imported plugin object
    },
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    },
  },
];
