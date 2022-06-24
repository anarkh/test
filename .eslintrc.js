module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  overrides: [
    {
      files: 'performance/*.js',
      extends: [
        '@fe/eslint-config-search',
      ],
      rules: {
        complexity: ['error', 1],
        'vue/require-default-prop': 'off',
      },
    },
  ],
  rules: {
  }
}
