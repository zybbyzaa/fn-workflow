var lib = require('../util/lib');
var del = require('del');

module.exports = function(gulp, common) {
  gulp.task('clean', ['log_version'], function(cb) {
    var delPath = common.config.paths.dist.root;
    if (lib.dirExist(delPath)) {
      del([delPath]).then(function() {
        common.plugins.util.log(common.plugins.util.colors.red('删除dist目录成功'));
      });
    }
    lib.task_log('clean');
    cb();
  });
};