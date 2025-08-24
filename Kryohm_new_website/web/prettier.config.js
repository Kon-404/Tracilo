/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'es5',
  printWidth: 100,
  endOfLine: 'lf',
  arrowParens: 'avoid',
  bracketSpacing: true,
  jsxSingleQuote: false,
  quoteProps: 'as-needed',
  plugins: ['prettier-plugin-tailwindcss'],
}

module.exports = config
