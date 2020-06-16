module.exports = {
    publicPath: process.env.VUE_APP_CND_LINK,
    css: {
        loaderOptions: {
            stylus: {
                import: '~@/assets/css/loader.styl',
            },
        },
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8081/',
                changeOrigin: true,
            },
        },
    },
}
