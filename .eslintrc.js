module.exports = {
    extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'prettier', 'prettier/react'],
    parser: '@typescript-eslint/parser',
    env: {
        "browser": true,
    },
    plugins: ['@typescript-eslint', 'prettier'],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {},
        },
    },
    rules: {
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        // use typescript type interface
        'react/prop-types': [0],
        'import/no-extraneous-dependencies': [2, { devDependencies: ['**/test.tsx', '**/test.ts'] }],
        'import/extensions': ['error', 'ignorePackages', {
            'js': 'never',
            'jsx': 'never',
            'ts': 'never',
            'tsx': 'never',
        }],


        // default rules
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-underscore-dangle": [
            "error",
            {
                "allow": ["_id"] // mongodb _id key
            }
        ],
        "prettier/prettier": [
            "error",
            {
                "singleQuote": true,
                "printWidth": 80,
                "tabWidth": 4,
                "useTabs": false
            },
        ],
    },
};