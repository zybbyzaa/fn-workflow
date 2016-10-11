var lib = require('../util/lib');
var runSequence = require('run-sequence');

module.exports = function (gulp, common) {
    //注册 build_dev 任务
    gulp.task('build_dev',['clean'], function(cb){
        if(common.config.platform === 'mobile'){
            runSequence(
                'compile_mcss',
                ['compile_js','compile_html'],
                ['minify_img','minify_sprite'],
                'load_plugins',
                'watch',
                'start_server', cb)
        } else if(common.config.platform === 'pc'){
            runSequence(
                'compile_css',
                ['compile_js','compile_html'],
                ['minify_img','minify_sprite'],
                'load_plugins',
                'watch',
                'start_server', cb)
        } else{
            runSequence(
                'compile_css',
                'compile_mcss',
                ['compile_js','compile_html'],
                ['minify_img','minify_sprite'],
                'load_plugins',
                'watch',
                'start_server', cb)
        }
    });
}
