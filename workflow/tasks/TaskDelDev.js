// 清除dev目录
var del = require('del');

module.exports = function (gulp, common) {
  gulp.task('del_dev', function() {
    del([common.config.paths.dev.dir]);
    common.plugins.util.log(common.plugins.util.colors.green('清除dev目录成功'));
  });
};