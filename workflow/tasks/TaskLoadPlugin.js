var lib = require('../util/lib');

module.exports = function (gulp, common) {
  gulp.task('load_plugins', function() {
    common.plugins.util.log('开始加载插件');
    lib.loadPlugin('build_dev');
  });
};
