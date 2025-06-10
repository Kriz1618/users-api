// eslint.config.mjs
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'], // Only lint TypeScript files
    ignores: [
      'dist/**',
      'node_modules/**',
      '**/*.d.ts', // Ignore TypeScript declaration files
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.node, // Node.js globals
        ...globals.es2021, // ES2021 globals
      },
    },
    plugins: {
      '@typescript-eslint': tseslint, // Assign the imported plugin object
    },
    rules: {
      ...prettierConfig.rules, // Apply Prettier rules
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'none',
          vars: 'all',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
