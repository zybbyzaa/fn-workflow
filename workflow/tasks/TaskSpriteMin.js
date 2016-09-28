// 压缩js文件
var pngquant = require('imagemin-pngquant');

module.exports = function (gulp, common) {
  gulp.task('minify_sprite', function() {
    common.plugins.util.log('开始压缩图片');
    return gulp.src(common.config.paths.tmp.sprite+'/**/*')
        .pipe(common.plugins.imagemin({
            use: [pngquant()]
        }))
        .pipe(gulp.dest(common.config.paths.dev.sprite));
  });
};
