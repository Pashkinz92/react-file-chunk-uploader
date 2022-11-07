module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['@typescript-eslint', 'tsc'],
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    'tsc/config': [
      1,
      {
        configFile: './tsconfig.json',
      },
    ],
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-namespace': 1,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/ban-types': 1,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'sort-imports': [0, { ignoreCase: true }],
  },
  overrides: [

  ],
};
