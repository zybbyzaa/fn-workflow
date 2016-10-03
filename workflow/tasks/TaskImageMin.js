// 压缩js文件
var lib = require('../util/lib');
var argv = require('yargs').argv;
var pngquant = require('imagemin-pngquant');

module.exports = function (gulp, common) {
  gulp.task('minify_img', function() {
    common.plugins.util.log('开始压缩图片');
    return gulp.src(common.config.paths.src.img)
        .pipe(common.plugins.imagemin({
            use: [pngquant()]
        }))
        .pipe(gulp.dest(common.config.paths.dist.img))
        .on('end',function(){
            lib.task_log('minify_img');
        });
  });
};
