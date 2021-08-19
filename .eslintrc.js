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
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'import/order': [
      'warn',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: [
          'builtin',
          ['external', 'internal'],
          'parent',
          ['sibling', 'index'],
        ],
      },
    ],
  },
};
