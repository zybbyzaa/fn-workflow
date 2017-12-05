var runSequence = require('run-sequence');
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  //注册 build_dev 任务
  var taskList = [
    'compile_css',
    'compile_js',
    'compile_html',
    'copy_img',
    'watch',
    'load_plugins',
    'start_server'
  ];
  gulp.task('build_dev', function(cb) {
    runSequence(...taskList, cb);
  });
};
