// 压缩js文件
var argv = require('yargs').argv;
var pngquant = require('imagemin-pngquant');
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  gulp.task('copy_img', function() {
    //将源目录下的图片移动到输出目录
    common.plugins.util.log('开始复制图片');
    var srcPath = [
      `${common.config.paths.src.root}${common.config.paths.src.img}`,
      `!${common.config.paths.src.root}${common.config.paths.src.imgSprites}`
    ];
    var distPath = `${common.config.paths.dist.root}${common.config.paths.dist
      .img}`;
    return gulp
      .src(srcPath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(common.plugins.changed(distPath))
      .pipe(gulp.dest(distPath))
      .on('end', function() {
        lib.task_log('copy_img');
        lib.reloadhandle();
      });
  });
};
