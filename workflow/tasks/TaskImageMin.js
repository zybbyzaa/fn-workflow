// 压缩js文件
var lib = require('../util/lib');
var argv = require('yargs').argv;
var pngquant = require('imagemin-pngquant');

module.exports = function (gulp, common) {
    gulp.task('minify_img', function () {
        common.plugins.util.log('开始压缩图片');
        var srcPath = [`${common.config.paths.src.root}${common.config.paths.src.img}`, `!${common.config.paths.src.root}${common.config.paths.src.imgSprites}`]
        var distPath = `${common.config.paths.dist.root}${common.config.paths.dist.img}`
        return gulp.src(srcPath)
            .pipe(common.plugins.plumber(lib.handleErrors))
            .pipe(common.plugins.changed(distPath))
            .pipe(gulp.dest(distPath))
            // .pipe(common.plugins.if(argv.env == 'prod', common.plugins.imageisux('/', false)))
            .on('end', function () {
                lib.task_log('minify_img');
                lib.reloadhandle();
            });
    });
};
