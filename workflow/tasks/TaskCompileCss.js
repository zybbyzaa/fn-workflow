var fs = require('fs');
var path = require('path');
var postcssAutoprefixer = require('autoprefixer');
var merge2 = require('merge2');
var postcssAssets = require('postcss-assets');
var postcssPxtorem = require('postcss-pxtorem'); // 转换 px 为 rem
var postcssSprites = require('postcss-sprites');
var postcssUrlrev = require('postcss-urlrev');
var hash = require('rev-hash');
var runSequence = require('run-sequence');
var through = require('through2');
var argv = require('yargs').argv;
var isProd = argv.env === 'prod';
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  var config = common.config,
    plugins = common.plugins;
  var postcssOption = [
    postcssAutoprefixer({
      browsers: common.config['postcss']['autoprefixer']['pc']
    }),
    postcssAssets()
  ];
  if (isProd) {
    var postcssSpritesConfig = common.config['postcss']['sprites']();
    postcssOption.push(postcssSprites(postcssSpritesConfig));
    postcssOption.push(postcssUrlrev());
  }

  gulp.task('compile_css', function() {
    plugins.util.log('开始编译scss');
    var srcPath = [
      `${config.paths.src.root}/css/**/*.css`,
      `${config.paths.src.root}/css/**/style-*.scss`
    ];
    var destPath = `${config.paths.dist.root}/css`;
    var libFilter = plugins.filter(
      file => {
        return !/\\lib\\/.test(file.path);
      },
      { restore: true }
    );
    var mobileFilter = plugins.filter(
      file => {
        return /\\m\\/.test(file.path);
      },
      { restore: true }
    );
    var revFilter = plugins.filter(file => {
      return !/\\lib\\/.test(file.path);
    });
    return gulp
      .src(srcPath)
      .pipe(plugins.plumber(lib.handleErrors))
      .pipe(plugins.changed(destPath, { extension: '.css' }))
      .pipe(plugins.logger({ showChange: true }))
      .pipe(libFilter)
      .pipe(plugins.sass())
      .on('error', plugins.sass.logError)
      .pipe(plugins.postcss(postcssOption))
      .pipe(
        plugins.base64({
          extensions: ['svg', 'png', 'jpg'],
          maxImageSize: 8 * 1024, // bytes,
          deleteAfterEncoding: false
        })
      )
      .pipe(mobileFilter)
      .pipe(plugins.postcss([postcssPxtorem(config['postcss']['pxtorem'])]))
      .pipe(mobileFilter.restore)
      .pipe(plugins.if(isProd, plugins.rev()))
      .pipe(libFilter.restore)
      .pipe(gulp.dest(destPath))
      .pipe(revFilter)
      .pipe(plugins.if(isProd, plugins.rev.manifest()))
      .pipe(
        plugins.if(
          isProd,
          gulp.dest(`${config.paths.src.root}${config.paths.src.revDist}/css`)
        )
      )
      .on('end', function() {
        lib.task_log('compile_css');
        lib.reloadhandle();
      });
  });
};
