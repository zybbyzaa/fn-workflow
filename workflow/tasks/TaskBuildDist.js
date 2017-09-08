var lib = require('../util/lib');
var runSequence = require('run-sequence');

module.exports = function (gulp, common) {
    //注册 build_dist 任务
    gulp.task('build_dist', function (cb) {
        runSequence(
            'compile_css',
            'compile_mcss',
            'compile_js',
            'copy_html',
            'minify_img',
            'load_plugins', cb)
    });
}
