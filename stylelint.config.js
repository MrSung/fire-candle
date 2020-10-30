const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate')

module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-property-sort-order-smacss',
    'stylelint-config-styled-components'
  ],
  plugins: [
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties'
  ],
  ignoreFiles: ['src/@types/**'],
  rules: {
    'order/properties-order': [sortOrderSmacss()],
    'plugin/declaration-block-no-ignored-properties': true,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'block-no-empty': null,
    'no-descending-specificity': null,
    'declaration-colon-newline-after': null,
    indentation: null,
    'function-parentheses-newline-inside': null,
    'value-keyword-case': ['lower', { ignoreKeywords: ['/dummyValue/'] }]
  }
}
