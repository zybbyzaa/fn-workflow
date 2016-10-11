// 压缩js文件
var lib = require('../util/lib');
var argv = require('yargs').argv;
var pngquant = require('imagemin-pngquant');
var path = require('path');

module.exports = function (gulp, common) {
  gulp.task('minify_sprite', function() {
    common.plugins.util.log('开始压缩雪碧图');
    return gulp.src(path.join(common.config.paths.tmp.sprite,'/**/*'))
        .pipe(common.plugins.imagemin({
            use: [pngquant()]
        }))
        .pipe(gulp.dest(common.config.paths.dist.sprite))
        .on('end',function(){
            lib.task_log('minify_sprite');
            lib.reloadhandle();
        });
  });
};
