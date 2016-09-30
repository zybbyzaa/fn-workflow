// 监听文件变动
var runSequence = require('run-sequence');
var path = require('path');
var del = require('del');
var lib = require('../util/lib');


module.exports = function (gulp, common) {
    function watchHandler (type, file) {
        var target = file.match(/src[\/|\\](.*?)[\/|\\]/)[1];

        switch (target) {
            case 'images':
                if (type === 'removed') {
                    var tmp = file.replace(/src/, 'dev');
                    del([tmp]);
                    common.plugins.util.log(common.plugins.util.colors.red('File ' + tmp + ' was ' + type));
                } else {
                    runSequence('minify_img');
                }
                break;

            case 'slice':
                runSequence('compile_sass','compile_postcss','minify_sprite');
                break;

            case 'js':
                if (type === 'removed') {
                    var tmp = file.replace('src', 'dev');
                    del([tmp]);
                    common.plugins.util.log(common.plugins.util.colors.red('File ' + tmp + ' was ' + type));
                } else {
                    runSequence('compile_js');
                }
                break;

            case 'css':
                var ext = path.extname(file);
                if (type === 'removed') {
                    var tmp = file.replace('src', 'dev').replace(ext, '.css');
                    del([tmp]);
                    common.plugins.util.log(common.plugins.util.colors.red('File ' + tmp + ' was ' + type));
                } else {
                    runSequence('compile_css','compile_postcss','minify_sprite');
                }
                break;

            case 'html':
                if (type === 'removed') {
                    var tmp = file.replace('src', 'dev');
                    del([tmp]).then(function () {
                        lib.loadPlugin('build_dev');
                    });
                    common.plugins.util.log(common.plugins.util.colors.red('File ' + tmp + ' was ' + type));
                } else {
                    runSequence('compile_html');
                }
                if (type === 'add') {
                    setTimeout(function () {
                        lib.loadPlugin('build_dev');
                    }, 500);
                }
                break;
        }
    };

    gulp.task('watch', function() {
        gulp.watch([common.config.paths.src.img,
                    common.config.paths.src.slice,
                    common.config.paths.src.js,
                    common.config.paths.src.lessAll,
                    common.config.paths.src.sassAll,
                    common.config.paths.src.htmlAll],function(event) {
            var type = event.type;
            var file = event.path.replace(/\\/g,'\/');
            watchHandler(type, file);
            lib.reloadhandle();
        })
    });
};
