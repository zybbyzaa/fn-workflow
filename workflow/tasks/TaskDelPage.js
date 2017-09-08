var lib = require('../util/lib');
var del = require('del');
var argv = require('yargs').argv;

module.exports = function(gulp, common) {
  var name = argv.name,
    isMobile = argv.m;
  var htmlName = `${name}.shtml`,
    cssName = `style-${name}.scss`,
    jsName = `${name}.js`,
    jsonName = `${name}.json`;
  // 删除json文件
  var htmlPath = `${common.config.paths.src.root}${isMobile
      ? common.config.paths.src.htmlMobile
      : common.config.paths.src.html}/${htmlName}`,
    cssPath = `${common.config.paths.src.root}${isMobile
      ? common.config.paths.src.cssMobile
      : common.config.paths.src.css}/${cssName}`,
    jsPath = `${common.config.paths.src.root}${isMobile
      ? common.config.paths.src.jsMobile
      : common.config.paths.src.js}/${jsName}`,
    jsonPath = `${common.config.paths.src.root}${isMobile
      ? common.config.paths.src.jsonMobile
      : common.config.paths.src.json}/${jsonName}`;
  gulp.task('del_page', function() {
    if (lib.fileExist(htmlPath)) {
      del([htmlPath]).then(function() {
        common.plugins.util.log(
          common.plugins.util.colors.red('删除' + htmlPath + '成功')
        );
      });
    }
    if (lib.fileExist(cssPath)) {
      del([cssPath]).then(function() {
        common.plugins.util.log(
          common.plugins.util.colors.red('删除' + cssPath + '成功')
        );
      });
    }
    if (lib.fileExist(jsPath)) {
      del([jsPath]).then(function() {
        common.plugins.util.log(
          common.plugins.util.colors.red('删除' + jsPath + '成功')
        );
      });
    }
    if (lib.fileExist(jsonPath)) {
      del([jsonPath]).then(function() {
        common.plugins.util.log(
          common.plugins.util.colors.red('删除' + jsonPath + '成功')
        );
      });
    }
  });
};
