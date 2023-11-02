/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  'rules': {
    'quotes': ['error', 'single'],
    'linebreak-style': 0,
    'comma-dangle': ['error', 'never'],
    'indent': ['error', 2],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 0, 'maxEOF': 1 }],
    'eol-last': ['error', 'always']
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
