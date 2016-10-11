var lib = require('../util/lib');
var runSequence = require('run-sequence');

module.exports = function (gulp, common) {
    //注册 build_dist 任务
    gulp.task('build_dist',['clean'], function(cb){
        runSequence(
            'compile_css',
            ['compile_js','compile_html'],
            ['minify_img','minify_sprite'],
            'load_plugins', cb)
    });
}
