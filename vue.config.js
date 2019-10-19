const publicPath = process.env.NODE_ENV === 'production' ? '/g6editor-vue/' : '/';
module.exports = {
    // 部署应用包时的基本 URL
    publicPath,
    // build 时生成的生产环境构建文件的目录。
    outputDir: 'docs',
    // 生产环境的 source map
    productionSourceMap: false,
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // 向所有 Sass 样式传入共享的全局变量
                // prependData: `@import "~@/assets/css/_mixins.sass" `,
                prependData: () => {
                    return `@import "~@/assets/css/_mixins.sass"`;
                },
                sassOptions: {
                    indentedSyntax: true
                }
            }
        }
    }
};
