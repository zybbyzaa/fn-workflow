// 监听文件变动
var runSequence = require('run-sequence');
var path = require('path');
var del = require('del');
var lib = require('../util/lib');


module.exports = function (gulp, common) {
    gulp.task('watch', function() {
        gulp.watch(common.config.paths.src.cssAll,function(event){
            var type = event.type;
            var file = event.path.replace(/\\/g,'\/');
            var ext = path.extname(file);
            if (type === 'removed') {
                var tmp = file.replace('src', 'dist').replace(ext, '.css');
                del([tmp]);
                common.plugins.util.log(common.plugins.util.colors.red('File ' + tmp + ' was ' + type));
            } else {
                common.plugins.util.log(common.plugins.util.colors.green('File ' + file + ' was ' + type));
                runSequence(['compile_css','compile_mcss'],'minify_sprite');
            }
            lib.reloadhandle();
        });
        gulp.watch(common.config.paths.src.htmlAll,function(event){
            var type = event.type;
            var file = event.path.replace(/\\/g,'\/');
            if (type === 'removed') {
                var tmp = file.replace('src', 'dist');
                del([tmp]).then(function () {
                    lib.loadPlugin('build_dev');
                });
                common.plugins.util.log(common.plugins.util.colors.red('File ' + tmp + ' was ' + type));
            } else {
                common.plugins.util.log(common.plugins.util.colors.green('File ' + file + ' was ' + type));
                runSequence('compile_html');
            }
            if (type === 'add') {
                setTimeout(function () {
                    lib.loadPlugin('build_dev');
                }, 500);
            }
            lib.reloadhandle();
        });
        gulp.watch(common.config.paths.src.js,function(event){
            var type = event.type;
            var file = event.path.replace(/\\/g,'\/');
            if (type === 'removed') {
                var tmp = file.replace('src', 'dist');
                del([tmp]);
                common.plugins.util.log(common.plugins.util.colors.red('File ' + tmp + ' was ' + type));
            } else {
                common.plugins.util.log(common.plugins.util.colors.green('File ' + file + ' was ' + type));
                runSequence('compile_js');
            }
            lib.reloadhandle();
        });
        gulp.watch(common.config.paths.src.img,function(event){
            var type = event.type;
            var file = event.path.replace(/\\/g,'\/');
            if (type === 'removed') {
                var tmp = file.replace(/src/, 'dist');
                del([tmp]);
                common.plugins.util.log(common.plugins.util.colors.red('File ' + tmp + ' was ' + type));
            } else {
                common.plugins.util.log(common.plugins.util.colors.green('File ' + file + ' was ' + type));
                runSequence('minify_img');
            }
            lib.reloadhandle();
        });
    });
};
