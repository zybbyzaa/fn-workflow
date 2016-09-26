// 编译sass文件

module.exports = function (gulp, common) {
  gulp.task('compile_sass', function() {
    common.plugins.util.log('开始编译sass');
    return gulp.src(common.config.paths.src.sass)
        .pipe(common.plugins.sass())
        .on('error',common.plugins. sass.logError)
        .pipe(common.plugins.lazyimagecss({imagePath: common.config.lazyDir}))
        .pipe(common.plugins.tmtsprite({margin: 4}))
        .pipe(common.plugins.if('*.png', gulp.dest(common.config.paths.tmp.sprite), gulp.dest(common.config.paths.tmp.css)));
  });
};
