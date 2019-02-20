// vue.config.js
module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                return [{
                    template: "_layouts/default.html"

                }]
            })
    }
}