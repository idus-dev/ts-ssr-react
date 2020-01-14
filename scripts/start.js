const express = require('express');
const path = require('path');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const { prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const applyDevMiddleware = require('./utils/applyDevMiddleware');
const purgeCacheOnChange = require('./utils/purgeCacheOnChange');

const server = express();
const isDevelopment = process.env.NODE_ENV !== 'production';
const isInteractive = process.stdout.isTTY;
const port = isDevelopment ? 3000 : 3030;
const host = isDevelopment ? 'localhost' : 'localhost';
const urls = prepareUrls('http', host, port);

if (isDevelopment) applyDevMiddleware(server);

server.use((req, res) => {
    // We use "require" inside this function
    // so that when purgeCacheOnChange() runs we pull in the most recent code.
    // https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e

    /* eslint-disable global-require */
    const { app } = isDevelopment
        ? require('../dev/server')
        : require('../build/server');

    app(req, res);
});

server.listen(port, () => {
    if (isDevelopment) {
        if (isInteractive) clearConsole();
        openBrowser(urls.localUrlForBrowser);
        purgeCacheOnChange(path.resolve(__dirname, '../'));
    }
    /* eslint-disable no-console */
    console.log(`Server started on port:${port} | env=${process.env.NODE_ENV}`);
});
