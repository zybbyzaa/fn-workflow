var runSequence = require('run-sequence');
var platform = require('yargs').argv.platform || 'all';
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  //注册 build_dev 任务
  var taskList = [
    'compile_js',
    'compile_html',
    'copy_img',
    'watch',
    'load_plugins',
    'start_server'
  ];
  if (platform !== 'pc') {
    taskList.unshift('compile_mcss');
  }
  if (platform !== 'mobile') {
    taskList.unshift('compile_css');
  }
  gulp.task('build_dev', function(cb) {
    runSequence(...taskList, cb);
  });
};
