// 编译html文件
var path = require('path');
var merge2 = require('merge2');
var through = require('through2');
var argv = require('yargs').argv,
  platform = argv.platform || 'all';
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  gulp.task('copy_html', function(cb) {
    common.plugins.util.log('开始编译html');
    var srcPath = `${common.config.paths.src.root}${common.config.paths.src
      .html}`;
    var srcMobilePath = `${common.config.paths.src.root}${common.config.paths
      .src.htmlMobile}`;
    var srcCommonPath = `${common.config.paths.src.root}${common.config.paths
      .src.htmlCommon}`;
    var srcMobileCommonPath = `${common.config.paths.src.root}${common.config
      .paths.src.htmlMobileCommon}`;
    var distPath = `${common.config.paths.dist.root}${common.config.paths.dist
      .html}`;
    var distMobilePath = `${common.config.paths.dist.root}${common.config.paths
      .dist.htmlMobile}`;
    var distCommonPath = `${common.config.paths.dist.root}${common.config.paths
      .dist.htmlCommon}`;
    var distMobileCommonPath = `${common.config.paths.dist.root}${common.config
      .paths.dist.htmlCommon}`;
    var htmlStream =
      platform !== 'mobile'
        ? gulp
            .src(srcPath)
            .pipe(common.plugins.plumber(lib.handleErrors))
            .pipe(common.plugins.changed(distPath))
            .pipe(
              common.plugins.logger({
                showChange: true
              })
            )
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

                var content = file.contents
                  .toString()
                  .replace('<#import "/common/common.ftl" as s>', '');
                var reg = new RegExp(common.config.contentPath, 'g');
                content = content.replace(reg, '');
                file.contents = new Buffer(content);

                this.push(file);

                cb();
              })
            )
            .pipe(gulp.dest(distPath))
        : null;
    var htmlCommonStream =
      platform !== 'mobile'
        ? gulp
            .src(srcCommonPath)
            .pipe(common.plugins.plumber(lib.handleErrors))
            .pipe(gulp.dest(distCommonPath))
        : null;

    var htmlMobileStream =
      platform !== 'pc'
        ? gulp
            .src(srcMobilePath)
            .pipe(common.plugins.plumber(lib.handleErrors))
            .pipe(common.plugins.changed(distMobilePath))
            .pipe(
              common.plugins.logger({
                showChange: true
              })
            )
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

                var content = file.contents
                  .toString()
                  .replace('<#import "/common/common.ftl" as s>', '');
                var reg = new RegExp(common.config.contentPath, 'g');
                content = content.replace(reg, '');
                file.contents = new Buffer(content);

                this.push(file);

                cb();
              })
            )
            .pipe(gulp.dest(distMobilePath))
        : null;
    var htmlMobileCommonStream =
      platform !== 'pc'
        ? gulp
            .src(srcMobileCommonPath)
            .pipe(common.plugins.plumber(lib.handleErrors))
            .pipe(gulp.dest(distMobileCommonPath))
        : null;
    if (platform === 'mobile') {
      return merge2(htmlMobileStream, htmlMobileCommonStream).on(
        'end',
        onStreamEnd
      );
    } else if (platform === 'pc') {
      return merge2(htmlStream, htmlCommonStream).on('end', onStreamEnd);
    } else {
      return merge2(
        htmlStream,
        htmlCommonStream,
        htmlMobileStream,
        htmlMobileCommonStream
      ).on('end', onStreamEnd);
    }
  });
};

function onStreamEnd() {
  lib.task_log('copy_html');
  lib.reloadhandle();
}
