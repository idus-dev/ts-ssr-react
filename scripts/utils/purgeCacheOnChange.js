// https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e
const chokidar = require('chokidar');

const purgeCacheOnChange = path => {
    const watcher = chokidar.watch(path, {
        ignoreInitial: true,
        ignored: /\/(node_modules|build)\//
    });

    watcher.on('ready', () => {
        watcher.on('all', () => {
            /* eslint-disable no-console */
            console.log('Reloading server...');

            Object.keys(require.cache).forEach(id => {
                if (/[/\\](src|server)[/\\]/.test(id)) {
                    delete require.cache[id];
                }
            });
        });
    });
};

module.exports = purgeCacheOnChange;
