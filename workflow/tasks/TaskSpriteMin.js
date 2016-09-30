// 压缩js文件
var lib = require('../util/lib');
var argv = require('yargs').argv;
var pngquant = require('imagemin-pngquant');

module.exports = function (gulp, common) {
  gulp.task('minify_sprite', function() {
    common.plugins.util.log('开始压缩图片');
    return gulp.src(common.config.paths.tmp.sprite+'/**/*')
        .pipe(common.plugins.imagemin({
            use: [pngquant()]
        }))
        .pipe(common.plugins.if(argv.env == 'prod',gulp.dest(common.config.paths.dist.sprite),gulp.dest(common.config.paths.dev.sprite)))
        .on('end',function(){
            lib.task_log('minify_sprite');
        });
  });
};
