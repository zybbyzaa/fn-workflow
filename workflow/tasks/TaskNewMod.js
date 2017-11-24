var path = require('path');
var argv = require('yargs').argv;
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  var name = argv.name,
    isMobile = argv.m;
  var srcHtmlPath = common.config.paths.tpl.modhtml,
    srcCssPath = common.config.paths.tpl.modcss,
    srcJsPath = common.config.paths.tpl.modjs;
  // var htmlName = `${name}.shtml`,
  //   cssName = `mod-${name}.scss`;
  var htmlPath = `${common.config.paths.src.root}${isMobile
    ? common.config.paths.src.htmlMobileCommon
    : common.config.paths.src.htmlCommon}`;
  var cssPath = `${common.config.paths.src.root}${isMobile
    ? common.config.paths.src.cssModMobile
    : common.config.paths.src.cssMod}`;
  var jsPath = `${common.config.paths.src.root}${isMobile
    ? common.config.paths.src.jsModMobile
    : common.config.paths.src.jsMod}`;
  gulp.task('new_mod', function() {
    gulp
      .src(srcHtmlPath)
      .pipe(common.plugins.rename(lib.getFileBaseName(htmlPath)))
      .pipe(gulp.dest(lib.getFileDir(htmlPath)))
      .on('end', function() {
        common.plugins.util.log('创建文件' + htmlPath + '成功！');
      });
    gulp
      .src(srcCssPath)
      .pipe(common.plugins.rename(lib.getFileBaseName(cssPath)))
      .pipe(gulp.dest(lib.getFileDir(cssPath)))
      .on('end', function() {
        common.plugins.util.log('创建文件' + cssPath + '成功！');
      });
    gulp
      .src(srcJsPath)
      .pipe(common.plugins.rename(lib.getFileBaseName(jsPath)))
      .pipe(gulp.dest(lib.getFileDir(jsPath)))
      .on('end', function() {
        common.plugins.util.log('创建文件' + jsPath + '成功！');
      });
  });
};
