// vue.config.js
module.exports = {
    outputDir: '_layouts',
    indexPath: "default.html",
    assetsDir: "../assets",
    css: {
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
            less: {
                javascriptEnabled: true
            }
        }
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                return [{
                    template: "public/default.html"

                }]
            })
    }
}