var lib = require('../util/lib');
var argv = require('yargs').argv;

module.exports = function (gulp, common) {
  gulp.task('load_plugins', function() {
    common.plugins.util.log('开始加载插件');
    if(argv == 'dev'){
        lib.loadPlugin('build_dev');
    }
    if(argv == 'prod'){
        lib.loadPlugin('build_dist');
    }
  });
};
