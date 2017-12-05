var runSequence = require('run-sequence');
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  //注册 build_dist 任务
  gulp.task('build_dist', function(cb) {
    runSequence(
      'compile_css',
      // 'compile_mcss',
      'compile_js',
      'compile_html',
      'copy_img',
      'rev',
      'load_plugins',
      cb
    );
  });
};
