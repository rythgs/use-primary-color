module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // 1 empty line
    'no-multiple-empty-lines': ['error', { max: 1 }],
    // no default export
    'import/prefer-default-export': 'off',
    // import order
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        'newlines-between': 'always',
      },
    ],
    // allow console.error, console.warn
    'no-console': ['error', { allow: ['warn', 'error'] }],
    // fix import error for .ts .tsx
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
}
