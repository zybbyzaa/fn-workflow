var argv = require('yargs').argv;

module.exports = function(gulp, common) {
  var name = argv.name,
    isMobile = argv.m;
  var srcHtmlPath = common.config.paths.tpl.modhtml,
    srcCssPath = common.config.paths.tpl.modcss;
  var htmlName = `${name}.shtml`,
    cssName = `mod-${name}.scss`;
  var htmlPath = `${common.config.paths.src.root}${isMobile ? common.config.paths.src.htmlMobileCommon : common.config.paths.src.htmlCommon}`;
  var cssPath = `${common.config.paths.src.root}${isMobile ? common.config.paths.src.cssModMobile : common.config.paths.src.cssMod}`;
  gulp.task('new_mod', function() {
    gulp
      .src(srcHtmlPath)
      .pipe(common.plugins.rename(htmlName))
      .pipe(gulp.dest(htmlPath))
      .on('end', function() {
        common.plugins.util.log('创建文件' + htmlPath + '/' + htmlName + '成功！');
      });
    gulp
      .src(srcCssPath)
      .pipe(common.plugins.rename(cssName))
      .pipe(gulp.dest(cssPath))
      .on('end', function() {
        common.plugins.util.log('创建文件' + cssPath + '/' + cssName + '成功！');
      });
  });
};