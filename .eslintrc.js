module.exports = {
  parser: 'babel-eslint',

  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'plugin:css-modules/recommended',
  ],

  plugins: [
    'flowtype',
    'css-modules',
  ],

  globals: {
    __DEV__: true,
  },

  env: {
    browser: true,
  },

  rules: {
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        mjs: 'never',
      },
    ],

    'import/no-extraneous-dependencies': 'off',

    'react/prop-types': 'off',

    semi: 0,

    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 'off',
    'react/forbid-prop-types': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/no-array-index-key': 'off',

    'no-plusplus': ['error', {
      "allowForLoopAfterthoughts": true,
    }],
  },

  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};
