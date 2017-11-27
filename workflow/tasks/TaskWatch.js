// 监听文件变动
var runSequence = require('run-sequence');
var path = require('path');
var del = require('del');
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  gulp.task('watch', function() {
    gulp.watch(
      `${common.config.paths.watch.root}${common.config.paths.watch.css}`,
      function(event) {
        var type = event.type;
        var file = event.path.replace(/\\/g, '/');
        var ext = path.extname(file);
        if (type === 'removed') {
          var tmp = file.replace('src', 'dist').replace(ext, '.css');
          del([tmp]);
          common.plugins.util.log(
            common.plugins.util.colors.red('File ' + tmp + ' was ' + type)
          );
        } else {
          common.plugins.util.log(
            common.plugins.util.colors.green('File ' + file + ' was ' + type)
          );
          runSequence('compile_css', 'compile_mcss', 'copy_img');
        }
      }
    );
    gulp.watch(
      `${common.config.paths.watch.root}${common.config.paths.watch.html}`,
      function(event) {
        var type = event.type;
        var file = event.path.replace(/\\/g, '/');
        if (type === 'removed') {
          var tmp = file.replace('src', 'dist');
          del([tmp]).then(function() {
            lib.loadPlugin('build_dev');
          });
          common.plugins.util.log(
            common.plugins.util.colors.red('File ' + tmp + ' was ' + type)
          );
        } else {
          common.plugins.util.log(
            common.plugins.util.colors.green('File ' + file + ' was ' + type)
          );
          if (lib.getFileDir(event.path).indexOf('common') < 0) {
            common.changeFileName = path.parse(event.path).name;
          } else {
            common.changeFileName = '';
          }
          runSequence('compile_html', 'copy_img');
        }
        if (type === 'add') {
          setTimeout(function() {
            lib.loadPlugin('build_dev');
          }, 500);
        }
      }
    );
    gulp.watch(
      `${common.config.paths.watch.root}${common.config.paths.watch.js}`,
      function(event) {
        var type = event.type;
        var file = event.path.replace(/\\/g, '/');
        if (type === 'removed') {
          var tmp = file.replace('src', 'dist');
          del([tmp]);
          common.plugins.util.log(
            common.plugins.util.colors.red('File ' + tmp + ' was ' + type)
          );
        } else {
          common.plugins.util.log(
            common.plugins.util.colors.green('File ' + file + ' was ' + type)
          );
          runSequence('compile_js');
        }
      }
    );
    gulp.watch(
      `${common.config.paths.watch.root}${common.config.paths.watch.img}`,
      function(event) {
        var type = event.type;
        var file = event.path.replace(/\\/g, '/');
        if (type === 'removed') {
          var tmp = file.replace(/src/, 'dist');
          del([tmp]);
          common.plugins.util.log(
            common.plugins.util.colors.red('File ' + tmp + ' was ' + type)
          );
        } else {
          common.plugins.util.log(
            common.plugins.util.colors.green('File ' + file + ' was ' + type)
          );
          runSequence('copy_img');
        }
      }
    );
  });
};
