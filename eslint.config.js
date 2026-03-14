import js from '@eslint/js'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      import: importPlugin,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/features/documents',
              from: './src/features',
              except: ['./documents'],
            },
            {
              target: './src/features/home',
              from: './src/features',
              except: ['./home'],
            },
            {
              target: './src/features/upload',
              from: './src/features',
              except: ['./upload'],
            },
            {
              target: './src/features',
              from: './src/app',
            },
            {
              target: [
                './src/config',
                './src/lib',
                './src/types',
                './src/utils',
                './src/components',
                './src/hooks',
              ],
              from: ['./src/features', './src/app'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/app/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../features/*/*', '../features/*/*', './features/*/*'],
              message:
                'Import features from their public API only (src/features/<feature-name>).',
            },
          ],
        },
      ],
    },
  },
])
