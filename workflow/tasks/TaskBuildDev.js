var lib = require('../util/lib');
var runSequence = require('run-sequence');

module.exports = function (gulp, common) {
    //注册 build_dev 任务
    gulp.task('build_dev', function (cb) {
        runSequence(
            'compile_css',
            'compile_mcss',
            'compile_js',
            'compile_html',
            'minify_img',
            'watch',
            'load_plugins',
            'start_server',
            cb)
    });
}
