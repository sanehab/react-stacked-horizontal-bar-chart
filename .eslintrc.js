const { peerDependencies } = require('./package.json');

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  plugins: ['react-hooks'],
  globals: {
    window: 'readonly'
  },
  rules: {
    'react/forbid-prop-types': 0,
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/no-unresolved': ['error', { ignore: Object.keys(peerDependencies) }],
    'react/prefer-stateless-function': 0,
    'no-console': 'error',
    'implicit-arrow-linebreak': 0,
    'arrow-parens': 0,
    indent: 0,
    'react/require-default-props': 0,
    'react/jsx-wrap-multilines': [
      2,
      {
        declaration: 'parens',
        assignment: 'parens',
        return: 'parens',
        arrow: 'parens',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'ignore'
      }
    ],
    'operator-linebreak': 'off',
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: true,
          object: true
        },
        AssignmentExpression: {
          array: true,
          object: true
        }
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    'no-lonely-if': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'ignore',
        objects: 'ignore',
        imports: 'ignore',
        exports: 'ignore',
        functions: 'ignore'
      }
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'object-curly-newline': 'off',
    'function-paren-newline': 'off',
    'no-confusing-arrow': 'off',
    'comma-style': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'jsx-a11y/alt-text': 'off',
    'arrow-body-style': 'off',
    'react/jsx-indent': 'off',
    'max-len': 'warn',
    'no-script-url': 'error'
  },
  overrides: [
    {
      files: ['**/*.spec.js', '**/*.spec.jsx'],
      env: { mocha: true },
      globals: {
        expect: 'readonly'
      },
      rules: {
        'mocha/no-mocha-arrows': 'off',
        'mocha/no-hooks-for-single-case': 'off'
      }
    }
  ]
};
