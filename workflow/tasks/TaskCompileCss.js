// 编译sass文件
var postcssPxtorem = require('postcss-pxtorem'); // 转换 px 为 rem
var postcssAutoprefixer = require('autoprefixer');
var postcssCssgrace = require('cssgrace');
var lib = require('../util/lib');

module.exports = function (gulp, common) {
    var postcssOption = [];

    if (common.config.supportREM) {
        postcssOption = [
            postcssAutoprefixer({ browsers: common.config["autoprefixer"][common.config.platform] }),
            postcssCssgrace,
            postcssPxtorem(common.config["postcssPxtorem"])
        ]
    } else {
        postcssOption = [
            postcssAutoprefixer({ browsers: common.config["autoprefixer"][common.config.platform] }),
            postcssCssgrace
        ]
    }

  gulp.task('compile_css', function() {
    common.plugins.util.log('开始编译sass');
    return gulp.src(common.config.paths.src.sass)
        .pipe(common.plugins.if(common.config.supportSass,common.plugins.sass())).on('error',common.plugins.sass.logError)
        .pipe(common.plugins.if(common.config.supportLess,common.plugins.less()))
        .pipe(common.plugins.lazyimagecss({imagePath: common.config.lazyDir}))
        .pipe(common.plugins.tmtsprite({margin: 4}))
        .pipe(common.plugins.if('*.png', gulp.dest(common.config.paths.tmp.sprite), gulp.dest(common.config.paths.tmp.css)))
        .pipe(gulp.src(common.config.paths.tmp.css+'/style-*.css'))
        .pipe(common.plugins.postcss(postcssOption))
        .pipe(gulp.dest(common.config.paths.dev.css))
        .on('end',function(){
            lib.task_log('compile_css');
        });
  });
};
