// 压缩js文件
var lib = require('../util/lib');
var argv = require('yargs').argv;
var pngquant = require('imagemin-pngquant');

module.exports = function (gulp, common) {
  gulp.task('minify_img', function() {
    common.plugins.util.log('开始压缩图片');
    return gulp.src(common.config.paths.src.img)
        .pipe(common.plugins.plumber(lib.handleErrors))
        .pipe(common.plugins.changed(common.config.paths.dist.img))
        .pipe(common.plugins.imagemin({
            progressive: true, // 无损压缩JPG图片
            svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性
            use: [pngquant()]
        },{verbose:true}))
        .pipe(gulp.dest(common.config.paths.dist.img))
        .on('end',function(){
            lib.task_log('minify_img');
        });
  });
};
