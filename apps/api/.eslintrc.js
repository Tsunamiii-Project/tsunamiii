module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'boundaries', 'prettier'],
  extends: [
    'standard-with-typescript',
    'plugin:n/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:boundaries/recommended',
    'prettier'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': 'error',
    'n/no-missing-import': 'off',
    'n/prefer-global/console': ['error', 'always'],
    'n/no-extraneous-import': [
      'error',
      {
        allowModules: ['express']
      }
    ],
    'n/file-extension-in-import': [
      'error',
      'never',
      {
        '': 'always',
        '.controller': 'always',
        '.service': 'always',
        '.exception': 'always',
        '.pipe': 'always',
        '.guard': 'always',
        '.interface': 'always',
        '.schema': 'always',
        '.entity': 'always',
        '.dto': 'always',
        '.model': 'always',
        '.module': 'always',
        '.gateway': 'always'
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/return-await': 'off',
    'boundaries/element-types': [
      2,
      {
        default: 'allow',
        rules: [
          {
            from: [
              'guard',
              'interface',
              'decorator',
              'model',
              'dto',
              'schema',
              'exception',
              'entity',
              'pipe'
            ],
            disallow: ['controller']
          }
        ]
      }
    ]
  },
  settings: {
    'boundaries/elements': [
      {
        type: 'controller',
        mode: 'file',
        pattern: 'src/*/*.controller.ts'
      },
      {
        type: 'guard',
        mode: 'file',
        pattern: 'src/*/*.guard.ts'
      },
      {
        type: 'service',
        mode: 'file',
        pattern: 'src/*/*.service.ts'
      },
      {
        type: 'interface',
        mode: 'file',
        pattern: 'src/*/*.interface.ts'
      },
      {
        type: 'decorator',
        mode: 'file',
        pattern: 'src/*/*.decorator.ts'
      },
      {
        type: 'dto',
        mode: 'file',
        pattern: 'src/*/*.dto.ts'
      },
      {
        type: 'entity',
        mode: 'file',
        pattern: 'src/*/*.entity.ts'
      },
      {
        type: 'exception',
        mode: 'file',
        pattern: 'src/*/*.exception.ts'
      },
      {
        type: 'schema',
        mode: 'file',
        pattern: 'src/*/*.schema.ts'
      },
      {
        type: 'model',
        mode: 'file',
        pattern: 'src/*/*.model.ts'
      },
      {
        type: 'module',
        mode: 'file',
        pattern: 'src/*/*.module.ts'
      },
      {
        type: 'pipe',
        mode: 'file',
        pattern: 'src/*/*.pipe.ts'
      }
    ]
  }
};
