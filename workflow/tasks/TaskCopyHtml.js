// 编译html文件
var lib = require('../util/lib');
var argv = require('yargs').argv;
var ejshelper = require('tmt-ejs-helper');
var posthtmlPx2rem = require('posthtml-px2rem');
var path = require('path');
var through = require('through2');
var merge2 = require('merge2');

module.exports = function(gulp, common) {

  gulp.task('copy_html', function(cb) {
    common.plugins.util.log('开始编译html');
    var srcPath = `${common.config.paths.src.root}${common.config.paths.src.html}/*.html`
    var srcMobilePath = `${common.config.paths.src.root}${common.config.paths.src.htmlMobile}/*.html`
    var srcCommonPath = `${common.config.paths.src.root}${common.config.paths.src.htmlCommon}/**/*.shtml`
    var srcMobileCommonPath = `${common.config.paths.src.root}${common.config.paths.src.htmlMobileCommon}/**/*.shtml`
    var distPath = `${common.config.paths.dist.root}${common.config.paths.dist.html}`
    var distMobilePath = `${common.config.paths.dist.root}${common.config.paths.dist.htmlMobile}`
    var distCommonPath = `${common.config.paths.dist.root}${common.config.paths.dist.htmlCommon}/common`
    var distMobileCommonPath = `${common.config.paths.dist.root}${common.config.paths.dist.htmlCommon}/m/common`
    var htmlStream = gulp.src(srcPath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(common.plugins.changed(distPath))
      .pipe(common.plugins.logger({
        showChange: true
      }))
      .pipe(through.obj(function(file, enc, cb) {
        if (file.isNull()) {
          this.push(file);
          return cb();
        }

        if (file.isStream()) {
          this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
          return cb();
        }

        var content = file.contents.toString().replace('<#import "/common/common.ftl" as s>', '');
        content = content.replace(common.config.contentPath, '');
        file.contents = new Buffer(content);

        this.push(file);

        cb();
      }))
      .pipe(common.plugins.if(argv.env == 'prod', common.plugins.rename({
        extname: ".shtml"
      })))
      .pipe(common.plugins.usemin())
      .pipe(gulp.dest(distPath));
    var htmlCommonStream = gulp.src(srcCommonPath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(gulp.dest(distCommonPath))
    var htmlMobileCommonStream = gulp.src(srcMobileCommonPath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(gulp.dest(distMobileCommonPath))
    var htmlMobileStream = gulp.src(srcMobilePath)
      .pipe(common.plugins.plumber(lib.handleErrors))
      .pipe(common.plugins.changed(distMobilePath))
      .pipe(common.plugins.logger({
        showChange: true
      }))
      .pipe(through.obj(function(file, enc, cb) {
        if (file.isNull()) {
          this.push(file);
          return cb();
        }

        if (file.isStream()) {
          this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
          return cb();
        }

        var content = file.contents.toString().replace('<#import "/common/common.ftl" as s>', '');
        file.contents = new Buffer(content);

        this.push(file);

        cb();
      }))
      .pipe(common.plugins.usemin())
      .pipe(common.plugins.if(
        common.config.supportREM,
        common.plugins.posthtml(posthtmlPx2rem({
          rootValue: 100,
          minPixelValue: 2
        }))))
      .pipe(common.plugins.if(argv.env == 'prod', common.plugins.rename({
        extname: ".shtml"
      })))
      .pipe(gulp.dest(distMobilePath));
    return merge2(htmlStream, htmlCommonStream, htmlMobileStream, htmlMobileCommonStream).on('end', function() {
      lib.task_log('copy_html');
      lib.reloadhandle();
    });
  });
};