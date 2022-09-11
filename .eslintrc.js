module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  ignorePatterns: ['node_modules/**'],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 0
  },
}
