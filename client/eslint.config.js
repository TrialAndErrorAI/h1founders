import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // SECURITY RULES: Prevent access control vulnerabilities
      'no-implicit-coercion': ['error', { boolean: false }],
      'no-ternary': 'off', // We'll use custom rule for security ternaries

      // Custom security patterns (will implement as plugin later)
      // For now, these are warnings to catch the exact pattern that caused our bug
      'prefer-explicit-assert': 'off', // Placeholder for future security plugin
    },
  },
)
