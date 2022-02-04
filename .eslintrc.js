module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'prettier', // Must be last to override other configs
  ],
  plugins: ['jest', 'import'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-plusplus': 'off',
    'import/no-unresolved': 2,
    'import/no-commonjs': 2,
    'import/extensions': [2, 'ignorePackages']
  },
};