module.exports = {
    parser: 'babel-eslint',
    extends: 'airbnb',
    plugins: ['babel'],
    globals: {
      require: true,
    },
    rules: {
      'no-console': 1,
      'no-underscore-dangle': 0,
      'no-param-reassign': 0,
      'react/jsx-filename-extension': 0,
      'react/prop-types': 0,
      'jsx-a11y/label-has-for': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      'react/no-danger': 1,
      'react/jsx-indent-props': [2, 2],
      'global-require': 1,
      'react/no-multi-comp': 1,
      'react/prefer-stateless-function': 0,
      'arrow-parens': 0,
      'import/prefer-default-export': 0,
    },
    settings: {
      'import/resolver': {
        'babel-module': {},
      },
    },
  };
  