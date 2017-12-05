var del = require('del');
var merge2 = require('merge2');
var lib = require('../util/lib');
var revCollector = require('../npm_fixed/gulp-rev-collector'); //使用本地修改的版本

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
        revCollector({
          replaceReved: true
        })
      )
      .pipe(gulp.dest(destPath))
      .on('end', () => {
        lib.task_log('rev');
      });
  });
};
