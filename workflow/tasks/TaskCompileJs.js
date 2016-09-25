// 编译js文件

module.exports = function (gulp, common) {
  gulp.task('compile_js', function() {
    common.plugins.util.log('开始编译js');
    return gulp.src(common.config.paths.src.js)
        .pipe(gulp.dest(common.config.paths.dev.js));
  });
};