// 编译js文件
var path = require('path');
var merge2 = require('merge2');
var through = require('through2');
var argv = require('yargs').argv,
  platform = argv.platform || 'all';
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  gulp.task('compile_js', function() {
    common.plugins.util.log('开始编译js');
    var srcPath = `${common.config.paths.src.root}${common.config.paths.src
      .js}`;
    var srcMobilePath = `${common.config.paths.src.root}${common.config.paths
      .src.jsMobile}`;
    var srcLibPath = `${common.config.paths.src.root}${common.config.paths.src
      .jsLib}`;
    var srcModPath = `${common.config.paths.src.root}${common.config.paths.src
      .jsMod}`;
    var srcMobileModPath = `${common.config.paths.src.root}${common.config.paths
      .src.jsModMobile}`;
    var distPath = `${common.config.paths.dist.root}${common.config.paths.dist
      .js}`;
    var distMobilePath = `${common.config.paths.dist.root}${common.config.paths
      .dist.jsMobile}`;
    var distLibPath = `${common.config.paths.dist.root}${common.config.paths
      .dist.jsLib}`;
    var distModPath = `${common.config.paths.dist.root}${common.config.paths
      .dist.jsMod}`;
    var distMobileModPath = `${common.config.paths.dist.root}${common.config
      .paths.dist.jsMobileMod}`;

    var jsLibStream = gulp
      .src(srcLibPath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(common.plugins.changed(distLibPath))
      .pipe(gulp.dest(distLibPath));
    var jsModStream = gulp
      .src(srcModPath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(common.plugins.changed(distModPath))
      .pipe(common.plugins.if(argv.env == 'prod', common.plugins.uglify()))
      .pipe(gulp.dest(distModPath));
    var jsMobileModStream = gulp
      .src(srcMobileModPath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(common.plugins.changed(distMobileModPath))
      .pipe(common.plugins.if(argv.env == 'prod', common.plugins.uglify()))
      .pipe(gulp.dest(distMobileModPath));
    var jsStream =
      platform !== 'mobile'
        ? gulp
            .src(srcPath)
            .pipe(common.plugins.plumber(lib.handleErrors))
            .pipe(common.plugins.changed(distPath))
            .pipe(
              common.plugins.if(argv.env == 'prod', common.plugins.uglify())
            )
            .pipe(common.plugins.if(argv.env == 'prod', common.plugins.rev()))
            .pipe(gulp.dest(distPath))
            .pipe(
              common.plugins.if(
                argv.env == 'prod',
                common.plugins.rev.manifest()
              )
            )
            .pipe(
              common.plugins.if(
                argv.env == 'prod',
                gulp.dest(
                  `${common.config.paths.src.root}${common.config.paths.src
                    .revDist}/js`
                )
              )
            )
        : null;
    var jsMobileStream =
      platform !== 'pc'
        ? gulp
            .src(srcMobilePath)
            .pipe(common.plugins.plumber(lib.handleErrors))
            .pipe(common.plugins.changed(distMobilePath))
            .pipe(
              common.plugins.if(argv.env == 'prod', common.plugins.uglify())
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
                    new gutil.PluginError(
                      PLUGIN_NAME,
                      'Streaming not supported'
                    )
                  );
                  return cb();
                }
                file.base = file.base.replace(/\\m$/, '');
                this.push(file);

                cb();
              })
            )
            .pipe(
              common.plugins.if(
                argv.env == 'prod',
                common.plugins.rev.manifest()
              )
            )
            .pipe(
              common.plugins.if(
                argv.env == 'prod',
                gulp.dest(
                  `${common.config.paths.src.root}${common.config.paths.src
                    .revDist}/js/m`
                )
              )
            )
        : null;
    if (platform === 'mobile') {
      return merge2(jsMobileStream, jsLibStream, jsMobileModStream).on(
        'end',
        onStreamEnd
      );
    } else if (platform === 'pc') {
      return merge2(jsStream, jsLibStream, jsModStream).on('end', onStreamEnd);
    } else {
      return merge2(
        jsStream,
        jsMobileStream,
        jsLibStream,
        jsModStream,
        jsMobileModStream
      ).on('end', onStreamEnd);
    }
  });
};

function onStreamEnd() {
  lib.task_log('compile_js');
  lib.reloadhandle();
}
