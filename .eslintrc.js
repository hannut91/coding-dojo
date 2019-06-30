module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'lines-between-class-members': 'off',
    'implicit-arrow-linebreak': 'off'
  },
};

