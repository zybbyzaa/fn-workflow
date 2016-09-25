// 清除dev目录
var del = require('del');

module.exports = function (gulp, common) {
  gulp.task('del_tmp', function() {
    del([common.config.paths.tmp.dir]);
    common.plugins.util.log(common.plugins.util.colors.green('清除tmp目录成功'));
  });
};