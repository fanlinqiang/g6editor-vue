const publicPath = process.env.NODE_ENV === 'production' ? '././' : '/';
module.exports = {
    // 部署应用包时的基本 URL
    publicPath,
    // build 时生成的生产环境构建文件的目录。
    outputDir: 'docs',
    // 生产环境的 source map
    productionSourceMap: false
};
