var del = require('del');
var merge2 = require('merge2');
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  gulp.task('rev', function(cb) {
    var srcPath = [
      `${common.config.paths.src.root}${common.config.paths.src.revSrc}`,
      `${common.config.paths.dist.root}/WEB-INF/**/*.shtml`
    ];
    var destPath = `${common.config.paths.dist.root}/WEB-INF`;
    var commonFilter = common.plugins.filter(file => {
      return !/(\\m)?\\common\\/.test(file.path);
    });
    return gulp
      .src(srcPath)
      .pipe(commonFilter)
      .pipe(
        common.plugins.revCollector({
          replaceReved: true
        })
      )
      .pipe(gulp.dest(destPath))
      .on('end', () => {
        lib.task_log('rev');
      });
    // var pcStream = gulp
    //   .src([
    //     `${common.config.paths.src.root}${common.config.paths.src.revSrc}`,
    //     `${common.config.paths.dist.root}/WEB-INF/*/*.shtml`,
    //     `!${common.config.paths.dist.root}/WEB-INF/common/*.shtml`
    //   ])
    //   .pipe(
    //     common.plugins.revCollector({
    //       replaceReved: true
    //     })
    //   )
    //   .pipe(gulp.dest(`${common.config.paths.dist.root}/WEB-INF`));
    // var mobileStream = gulp
    //   .src([
    //     `${common.config.paths.src.root}${common.config.paths.src
    //       .revSrcMobile}`,
    //     `${common.config.paths.dist.root}/WEB-INF/m/*/*.shtml`,
    //     `!${common.config.paths.dist.root}/WEB-INF/m/common/*.shtml`
    //   ])
    //   .pipe(
    //     common.plugins.revCollector({
    //       replaceReved: true
    //     })
    //   )
    //   .pipe(gulp.dest(`${common.config.paths.dist.root}/WEB-INF/m`));
    // return merge2(pcStream, mobileStream).on('end', () => {
    //   lib.task_log('rev');
    // });
  });
};
