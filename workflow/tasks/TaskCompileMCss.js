var path = require('path');
var postcssAutoprefixer = require('autoprefixer');
var merge2 = require('merge2');
var postcssAssets = require('postcss-assets');
var postcssPxtorem = require('postcss-pxtorem'); // 转换 px 为 rem
var postcssSprites = require('postcss-sprites');
var postcssUrlrev = require('postcss-urlrev');
var runSequence = require('run-sequence');
var through = require('through2');
var argv = require('yargs').argv;
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  var postcssOption = [
    postcssAutoprefixer({
      browsers: common.config['postcss']['autoprefixer']['mobile']
    }),
    postcssAssets(),
    postcssPxtorem(common.config['postcss']['pxtorem'])
  ];

  gulp.task('compile_mcss', function() {
    common.plugins.util.log('开始编译scss');
    if (argv.env === 'prod') {
      var postcssSpritesConfig = common.config['postcss']['sprites']();
      postcssOption.push(postcssSprites(postcssSpritesConfig));
      postcssOption.push(postcssUrlrev());
    }
    var srcMobilePath = `${common.config.paths.src.root}${common.config.paths
      .src.cssMobile}`;
    var distMobilePath = `${common.config.paths.dist.root}${common.config.paths
      .dist.cssMobile}`;
    return gulp
      .src(srcMobilePath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(common.plugins.changed(distMobilePath))
      .pipe(common.plugins.logger({ showChange: true }))
      .pipe(common.plugins.sass())
      .on('error', common.plugins.sass.logError)
      .pipe(common.plugins.postcss(postcssOption))
      .pipe(
        common.plugins.base64({
          extensions: ['svg', 'png', 'jpg'],
          maxImageSize: 8 * 1024, // bytes,
          deleteAfterEncoding: false,
          debug: true
        })
      )
      .pipe(common.plugins.if(argv.env == 'prod', common.plugins.rev()))
      .pipe(gulp.dest(distMobilePath))
      .pipe(
        through.obj(function(file, enc, cb) {
          if (file.isNull()) {
            this.push(file);
            return cb();
          }

          if (file.isStream()) {
            this.emit(
              'error',
              new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported')
            );
            return cb();
          }
          file.base = file.base.replace(/\\m$/, '');
          this.push(file);

          cb();
        })
      )
      .pipe(
        common.plugins.if(argv.env == 'prod', common.plugins.rev.manifest())
      )
      .pipe(
        common.plugins.if(
          argv.env == 'prod',
          gulp.dest(
            `${common.config.paths.src.root}${common.config.paths.src
              .revDist}/css/m`
          )
        )
      )
      .on('end', function() {
        common.plugins.util.log('mobile端样式编译完成');
        lib.reloadhandle();
      });
    lib.task_log('compile_mcss');
  });
};
