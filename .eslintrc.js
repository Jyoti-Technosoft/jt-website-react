module.exports = {
  extends: [
    'react-app'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'warn'
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
