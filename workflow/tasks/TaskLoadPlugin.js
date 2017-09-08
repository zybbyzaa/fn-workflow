var lib = require('../util/lib');
var argv = require('yargs').argv;
var env = argv.env || 'dev';

module.exports = function (gulp, common) {
    gulp.task('load_plugins', function (cb) {
        if (env == 'dev') {
            common.plugins.util.log('开始加载插件build_dev');
            lib.loadPlugin('build_dev');
        }
        if (env == 'prod') {
            common.plugins.util.log('开始加载插件build_dist');
            lib.loadPlugin('build_dist');
        }
        lib.reloadhandle();
        cb();
    });
};
