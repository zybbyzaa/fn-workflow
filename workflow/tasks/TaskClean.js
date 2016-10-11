var lib = require('../util/lib');
var del = require('del');

module.exports = function (gulp, common) {
    gulp.task('clean',['log_version'], function(cb) {
        if(lib.dirExist(common.config.paths.tmp.dir)){
          del([common.config.paths.tmp.dir]).then(function () {
              common.plugins.util.log(common.plugins.util.colors.red('删除tmp目录成功'));
          });
        }
        if(lib.dirExist(common.config.paths.dist.dir)){
          del([common.config.paths.dist.dir]).then(function () {
              common.plugins.util.log(common.plugins.util.colors.red('删除dist目录成功'));
          });
        }
        lib.task_log('clean');
        cb();
    });
};
