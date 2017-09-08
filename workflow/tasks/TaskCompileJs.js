// 编译js文件
var lib = require('../util/lib');
var argv = require('yargs').argv;

module.exports = function (gulp, common) {
    gulp.task('compile_js', function () {
        common.plugins.util.log('开始编译js');
        var srcPath = `${common.config.paths.src.root}/js/**/**/**/*.{js,css}`
        var distPath = `${common.config.paths.dist.root}${common.config.paths.dist.js}`
        return gulp.src(srcPath)
            .pipe(gulp.dest(distPath))
            .pipe(common.plugins.filter(function (file) {
                //过滤lib文件夹
                if (/\\js\\lib\\([0-9a-zA-Z-_.]+\\)*[0-9a-zA-Z-_.]+\.(css|js)$/.test(file.path)) {
                    console.log(file.path);
                    return false;
                }
                return true;
            }))
            .pipe(common.plugins.if(argv.env == 'prod', common.plugins.uglify()))
            .pipe(gulp.dest(distPath))
            .on('end', function () {
                lib.task_log('compile_js');
                lib.reloadhandle();
            });
    });
};
