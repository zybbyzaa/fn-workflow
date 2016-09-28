// 编译css文件
var postcssPxtorem = require('postcss-pxtorem'); // 转换 px 为 rem
var postcssAutoprefixer = require('autoprefixer');
var postcssCssgrace = require('cssgrace');

module.exports = function (gulp, common) {
  var postcssOption = [];

  if (common.config.supportREM) {
      postcssOption = [
          postcssAutoprefixer({ browsers: ['Android >= 4','iOS >= 6','last 3 versions','Explorer >= 8','Chrome >= 21','Firefox >= 1','Edge 13'] }),
          postcssCssgrace,
          postcssPxtorem({
              root_value: '100', // 基准值 html{ font-zise: 20px; }
              prop_white_list: [], // 对所有 px 值生效
              minPixelValue: 2 // 忽略 1px 值
          })
      ]
  } else {
      postcssOption = [
          postcssAutoprefixer({ browsers: ['Android >= 4','iOS >= 6','last 3 versions','Explorer >= 8','Chrome >= 21','Firefox >= 1','Edge 13'] }),
          postcssCssgrace
      ]
  }

  gulp.task('compile_postcss', function() {
    common.plugins.util.log('开始进行postcss处理');
    return gulp.src(common.config.paths.tmp.css+'/style-*.css')
            .pipe(common.plugins.postcss(postcssOption))
            .pipe(gulp.dest(common.config.paths.dev.css));
  });
};
