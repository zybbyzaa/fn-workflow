// 编译js文件
var lib = require('../util/lib');
var argv = require('yargs').argv;

module.exports = function (gulp, common) {
    gulp.task('compile_js', function() {
        common.plugins.util.log('开始编译js');
        return gulp.src(common.config.paths.src.js)
            .pipe(gulp.dest(common.config.paths.dist.js))
            .pipe(common.plugins.if(argv.env == 'prod',common.plugins.uglify()))
            .pipe(common.plugins.if(argv.env == 'prod',common.plugins.rename({ suffix: '.min' })))
            .pipe(gulp.dest(common.config.paths.dist.js))
            .on('end',function(){
                lib.task_log('compile_js');
            });
    });
};
