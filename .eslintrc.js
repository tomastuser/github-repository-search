module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
  },
  rules: {
    'linebreak-style': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'single'],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
  },
};
