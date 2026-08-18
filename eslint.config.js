import js from '@eslint/js';

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  { files: ['src/**/*.js', 'scripts/**/*.mjs'], languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: { window: 'readonly', document: 'readonly', localStorage: 'readonly', fetch: 'readonly', FormData: 'readonly', URLSearchParams: 'readonly', Intl: 'readonly', console: 'readonly', setTimeout: 'readonly' } }, rules: { 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }] } },
  { files: ['netlify/functions/**/*.js', 'tests/**/*.js', 'scripts/**/*.mjs', 'playwright.config.js'], languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: { process: 'readonly', fetch: 'writable', AbortController: 'readonly', URLSearchParams: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly', console: 'readonly', global: 'readonly' } } },
];
