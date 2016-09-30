var lib = require('../util/lib');
var argv = require('yargs').argv;

module.exports = function (gulp, common) {
    gulp.task('load_plugins', function() {
        if(argv.env == 'dev'){
            common.plugins.util.log('开始加载插件build_dev');
            lib.loadPlugin('build_dev');
        }
        if(argv.env == 'prod'){
            common.plugins.util.log('开始加载插件build_dist');
            lib.loadPlugin('build_dist');
        }
    });
};
