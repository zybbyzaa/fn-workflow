// 清除dev目录
var del = require('del');

module.exports = function (gulp, common) {
  gulp.task('del_dist', function() {
    del([common.config.paths.dist.dir]);
    common.plugins.util.log(common.plugins.util.colors.green('清除dist目录成功'));
  });
};