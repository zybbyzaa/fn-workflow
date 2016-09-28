var del = require('del');

module.exports = function (gulp, common) {
  gulp.task('clean_dir', function() {
    del([common.config.paths.dev.dir,common.config.paths.tmp.dir,common.config.paths.dist.dir]);
    common.plugins.util.log(common.plugins.util.colors.green('清除目录成功'));
  });
};
