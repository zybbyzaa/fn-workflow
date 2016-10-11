// 编译html文件
var lib = require('../util/lib');
var argv = require('yargs').argv;
var ejshelper = require('tmt-ejs-helper');
var posthtmlPx2rem = require('posthtml-px2rem');
var path = require('path');

module.exports = function (gulp, common) {
    var pcStream = null;
    var mobileStream = null;

    gulp.task('compile_html', function(cb) {
        common.plugins.util.log('开始编译html');
        if(common.config.platform !== 'mobile'){
            pcStream = gulp.src([path.join(common.config.paths.src.html,'**/*.html'),'!' + path.join(common.config.paths.src.html,'include/*.html')])
                .pipe(common.plugins.plumber(lib.handleErrors))
                .pipe(common.plugins.changed(common.config.paths.dist.html))
                .pipe(common.plugins.logger({ showChange: true }))
                .pipe(common.plugins.ejs(ejshelper()))
                .pipe(gulp.dest(common.config.paths.dist.html));
        }
        if(common.config.platform !== 'pc'){
            mobileStream = gulp.src([path.join(common.config.paths.src.html,'m/**/*.html'),'!' + path.join(common.config.paths.src.html,'m/include/*.html')])
                .pipe(common.plugins.plumber(lib.handleErrors))
                .pipe(common.plugins.changed(path.join(common.config.paths.dist.html,'m')))
                .pipe(common.plugins.logger({ showChange: true }))
                .pipe(common.plugins.ejs(ejshelper()))
                .pipe(common.plugins.if(
                    common.config.supportREM,
                    common.plugins.posthtml(posthtmlPx2rem({
                            rootValue: 20,
                            minPixelValue: 2
                        })
                )))
                .pipe(gulp.dest(path.join(common.config.paths.dist.html,'m')));
        }
        lib.task_log('compile_html');
        cb(err);
    });
};
