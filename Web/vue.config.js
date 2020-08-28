module.exports = {
    devServer: {
        proxy: 'http://10.7.10.26:4000/'
    },
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    }
}