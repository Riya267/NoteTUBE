const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

// Initialize FlatCompat with base directory
const compat = new FlatCompat({
  baseDirectory: path.resolve(__dirname),
});

// Import the necessary configurations directly
const standardWithTypeScript = require('eslint-config-standard-with-typescript');
// const reactRecommended = require('eslint-plugin-react').configs.recommended;
// const reactHooksRecommended = require('eslint-plugin-react-hooks').configs.recommended;
// const prettierConfig = require('eslint-config-prettier');

module.exports = [
  {
    files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
    
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['frontend/tsconfig.json', 'backend/tsconfig.json']
      },
      globals: {
        browser: 'readonly',
        es2021: 'readonly',
      },
    },
    
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    
    rules: {
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  
  // Extend the configuration with additional recommended settings
  ...compat.config(standardWithTypeScript),
  // ...compat.config(reactRecommended),
  // ...compat.config(reactHooksRecommended),
  // ...compat.config(prettierConfig),
];
