const isProductionENV = process.env.NODE_ENV === 'production';
module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': isProductionENV ? 'error' : 'off',
        'no-debugger': isProductionENV ? 'error' : 'off',
        // // 强制4个空格缩进
        'indent': [2, 4, { 'SwitchCase': 1 }],
        // // 行尾必须有分号
        'semi': ['error', 'always']
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
