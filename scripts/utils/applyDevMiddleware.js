const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../../webpack.config');

const applyDevMiddleware = app => {
    console.log(config);
    config[0].entry.app.unshift(
        'webpack-hot-middleware/client?reload=true&timeout=1000'
    );
    // Add HMR plugin
    config[0].plugins.push(new webpack.HotModuleReplacementPlugin());

    const compiler = webpack(config[0]);

    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: config[0].output.publicPath
        })
    );
    // Enable "webpack-hot-middleware"
    app.use(webpackHotMiddleware(compiler));
};

module.exports = applyDevMiddleware;
