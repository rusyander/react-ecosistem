module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:i18next/recommended',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },

  plugins: [
    'react',
    'react-hooks',
    'i18next',
    '@typescript-eslint',
    'rustam-plugin-fsd-elsint',
  ],
  rules: {
    'react/jsx-indent': [0, 2],
    'react/jsx-indent-props': [0, 2],
    '@typescript-eslint/indent': 'off',
    indent: [0, 2],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'comma-dangle': ['off', 'never'],
    semi: ['off', 'never'],
    'i18next/no-literal-string': [
      'warn',
      {
        markupOnly: true,
        ignoreAttribute: ['to', 'data-testid'],
      },
    ],
    'max-len': [
      'error',
      {
        ignoreComments: true,
        code: 130,
      },
    ],
    indent: 'off',

    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/semi': 'off',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'i18next/no-literal-string': 'off',
    'react/no-unescaped-entities': 'warn',
    '@typescript-eslint/await-thenable': 'warn',
    '@typescript-eslint/no-confusing-void-expression': 'warn',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/naming-convention': 'off',
    'n/handle-callback-error': 'off',
    'n/handle-callback-err': 'warn',
    'no-trailing-spaces': 'warn',
    '@typescript-eslint/parser': 'off',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/space-before-function-paren': 'warn',
    '@typescript-eslint/prefer-ts-expect-error': 'warn',
    '@typescript-eslint/prefer-includes': 'warn',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    '@typescript-eslint/consistent-type-imports': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
    '@typescript-eslint/no-dynamic-delete': 'warn',
    '@typescript-eslint/no-invalid-void-type': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'multiline-ternary': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'quote-props': 'off',
    'jsx-props-no-spreading': 'off',
    '@typescript-eslint/restrict-plus-operands': 'warn',
    '@typescript-eslint/restrict-template-expressions': 'warn',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
    'n/no-callback-literal': 'off',
    'spaced-comment': 'off',
    'rustam-plugin-fsd-elsint/path-checker': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'storybook/prefer-pascal-case': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    'react/jsx-no-duplicate-props': 'off',
    'no-unneeded-ternary': 'off',
    curly: 'off',
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  overrides: [
    {
      files: ['**/src/**/*.{test,stories}.{ts,tsx,jsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
        'max-len': 'off',
      },
    },
  ],
};
