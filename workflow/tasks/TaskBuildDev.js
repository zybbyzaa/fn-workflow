var runSequence = require('run-sequence');
var lib = require('../util/lib');

module.exports = function (gulp, common) {
    //注册 build_dev 任务
    gulp.task('build_dev', function(cb){
        runSequence(
         'log_version',
         'del_dev',
         'del_tmp',
         'compile_sass',
         'compile_postcss',
         'compile_js',
         'minify_img',
         'minify_sprite',
         'compile_html',
         'load_plugins',
         'watch',
         'start_server', cb)
    });
}
