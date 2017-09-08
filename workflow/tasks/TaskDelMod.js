var lib = require('../util/lib');
var del = require('del');
var argv = require('yargs').argv;

module.exports = function(gulp, common) {
  var name = argv.name,
    isMobile = argv.m;
  var htmlName = `${name}.shtml`,
    cssName = `mod-${name}.scss`;
  var htmlPath = `${common.config.paths.src.root}${isMobile ? common.config.paths.src.htmlMobileCommon : common.config.paths.src.htmlCommon}`;
  var cssPath = `${common.config.paths.src.root}${isMobile ? common.config.paths.src.cssModMobile : common.config.paths.src.cssMod}`;
  gulp.task('del_mod', function() {
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
  });
};