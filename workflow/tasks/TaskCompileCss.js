// 编译sass文件
var lib = require('../util/lib');
var argv = require('yargs').argv;
var postcssPxtorem = require('postcss-pxtorem'); // 转换 px 为 rem
var postcssAutoprefixer = require('autoprefixer');
var postcssCssgrace = require('cssgrace');

module.exports = function (gulp, common) {
    var postcssOption = [
        postcssAutoprefixer({
            browsers: common.config["autoprefixer"][common.config.platform]
        }),
        postcssCssgrace
    ]

    gulp.task('compile_css', function() {
        var f = common.plugins.filter('!src/m/style-*.css',{restore: true});
        common.plugins.util.log('开始编译sass');
        return gulp.src(common.config.paths.src.css)
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
            .pipe(gulp.src([common.config.paths.tmp.css+'/style-*.css',common.config.paths.tmp.css+'/m/style-*.css']))
            .pipe(common.plugins.postcss(postcssOption))
            .pipe(f)
            .pipe(common.plugins.if(common.config.supportREM,
                common.plugins.postcss([postcssPxtorem(common.config["postcssPxtorem"])])))
            .pipe(f.restore)
            .pipe(common.plugins.if(argv.env == 'prod',common.plugins.cleanCss()))
            .pipe(common.plugins.if(argv.env == 'prod',common.plugins.rename({ suffix: '.min' })))
            .pipe(common.plugins.if(argv.env == 'prod',gulp.dest(common.config.paths.dist.css),gulp.dest(common.config.paths.dev.css)))
            .on('end',function(){
                lib.task_log('compile_css');
            });
    });
};
