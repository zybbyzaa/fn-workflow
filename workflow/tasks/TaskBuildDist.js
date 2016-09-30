var lib = require('../util/lib');
var runSequence = require('run-sequence');

module.exports = function (gulp, common) {
    //注册 build_dev 任务
    gulp.task('build_dist', function(cb){
        runSequence(
            'log_version',
             'clean',
             'compile_css',
             'compile_js',
             'minify_img',
             'minify_sprite',
             'compile_html',
             'load_plugins', cb)
    });
}
