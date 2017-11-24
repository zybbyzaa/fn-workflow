var argv = require('yargs').argv;
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  var name = argv.name,
    isMobile = argv.m;
  var htmlPath = `${common.config.paths.src.root}${isMobile
    ? common.config.paths.src.htmlMobileCommon
    : common.config.paths.src.htmlCommon}`;
  var cssPath = `${common.config.paths.src.root}${isMobile
    ? common.config.paths.src.cssModMobile
    : common.config.paths.src.cssMod}`;
  var jsPath = `${common.config.paths.src.root}${isMobile
    ? common.config.paths.src.jsModMobile
    : common.config.paths.src.jsMod}`;
  gulp.task('del_mod', function() {
    lib.delFile(htmlPath);
    lib.delFile(cssPath);
    lib.delFile(jsPath);
  });
};
