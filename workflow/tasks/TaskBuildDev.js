var runSequence = require('run-sequence');

module.exports = function (gulp, common) {
    //注册 build_dev 任务
    gulp.task('build_dev', function(cb){
        runSequence(
         'log_version',
         'del_dev',
         'compile_sass',
         'compile_postcss',
         'compile_js',
         'compile_img',
         'minify_img',
         'minify_sprite', cb)
    });
}