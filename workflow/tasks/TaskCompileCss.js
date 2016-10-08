var lib = require('../util/lib');
var argv = require('yargs').argv;
var postcssPxtorem = require('postcss-pxtorem'); // 转换 px 为 rem
var postcssAutoprefixer = require('autoprefixer');
var postcssCssgrace = require('cssgrace');
var path = require('path');
var runSequence = require('run-sequence');
var merge = require('merge2');

module.exports = function (gulp, common) {
    var pcStream = null;
    var mobileStream = null;
    var postcssOption = [
        postcssAutoprefixer({
            browsers: common.config["autoprefixer"][common.config.platform]
        }),
        postcssCssgrace
    ];

    gulp.task('compile_css', function() {
        if(common.config.cssplatform == 'sass'){
            common.plugins.util.log('开始编译scss');
        }
        if(common.config.cssplatform == 'less'){
            common.plugins.util.log('开始编译less');
        }
        return gulp.src(path.join(common.config.paths.src.css,'style-*.{scss,less}'))
            .pipe(common.plugins.plumber(lib.handleErrors))
            .pipe(common.plugins.changed(common.config.paths.tmp.css,{extension:'.css'}))
            .pipe(common.plugins.logger({ showChange: true }))
            .pipe(common.plugins.if(common.config.cssplatform == 'sass',common.plugins.sass()))
            .on('error',common.plugins.sass.logError)
            .pipe(common.plugins.if(common.config.cssplatform == 'less',common.plugins.less()))
            .pipe(common.plugins.lazyimagecss({
                imagePath: common.config.lazyDir
            }))
            .pipe(common.plugins.tmtsprite({margin: 4}))
            .pipe(common.plugins.if('*.png',
                gulp.dest(common.config.paths.tmp.sprite),
                gulp.dest(common.config.paths.tmp.css)))
            .on('end',function(){
                common.plugins.util.log('pc端样式预处理编译完成');
            })
            .pipe(common.plugins.filter(function(file){
                console.log(file);
                if(/.css$/.test(file.path))
                    return true;
                return false;
            }))
            .pipe(common.plugins.plumber(lib.handleErrors))
            .pipe(common.plugins.changed(common.config.paths.dist.css))
            .pipe(common.plugins.logger({ showChange: true }))
            .pipe(common.plugins.postcss(postcssOption))
            .pipe(gulp.dest(common.config.paths.dist.css))
            .pipe(common.plugins.if(argv.env == 'prod',common.plugins.cleanCss()))
            .pipe(common.plugins.if(argv.env == 'prod',common.plugins.rename({ suffix: '.min' })))
            .pipe(gulp.dest(common.config.paths.dist.css))
            .on('end',function(){
                common.plugins.util.log('pc端样式编译完成');
            });
        lib.task_log('compile_css')
    });
}
