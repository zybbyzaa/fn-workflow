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
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  var postcssOption = [
    postcssAutoprefixer({
      browsers: common.config['postcss']['autoprefixer']['pc']
    }),
    postcssAssets()
  ];
  if (argv.env === 'prod') {
    var postcssSpritesConfig = common.config['postcss']['sprites']();
    postcssOption.push(postcssSprites(postcssSpritesConfig));
    postcssOption.push(postcssUrlrev());
  }

  gulp.task('compile_css', function() {
    common.plugins.util.log('开始编译scss');
    var srcPath = `${common.config.paths.src.root}${common.config.paths.src
      .css}`;
    var distPath = `${common.config.paths.dist.root}${common.config.paths.dist
      .css}`;
    var srcLibPath = `${common.config.paths.src.root}${common.config.paths.src
      .cssLib}`;
    var distLibPath = `${common.config.paths.dist.root}${common.config.paths
      .dist.cssLib}`;
    var cssStream = gulp
      .src(srcPath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(common.plugins.changed(distPath))
      .pipe(common.plugins.logger({ showChange: true }))
      .pipe(common.plugins.sass())
      .on('error', common.plugins.sass.logError)
      .pipe(common.plugins.postcss(postcssOption))
      .pipe(
        common.plugins.base64({
          extensions: ['svg', 'png', 'jpg'],
          maxImageSize: 8 * 1024, // bytes,
          deleteAfterEncoding: false
        })
      )
      .pipe(common.plugins.if(argv.env == 'prod', common.plugins.rev()))
      .pipe(gulp.dest(distPath))
      .pipe(
        common.plugins.if(argv.env == 'prod', common.plugins.rev.manifest())
      )
      .pipe(
        common.plugins.if(
          argv.env == 'prod',
          gulp.dest(
            `${common.config.paths.src.root}${common.config.paths.src
              .revDist}/css`
          )
        )
      )
      .on('end', function() {
        common.plugins.util.log('pc端样式编译完成');
      });
    var cssLibStream = gulp
      .src(srcLibPath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(gulp.dest(distLibPath));
    return merge2(cssStream, cssLibStream).on('end', function() {
      lib.task_log('compile_css');
      lib.reloadhandle();
    });
  });
};
