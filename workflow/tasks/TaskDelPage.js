var argv = require('yargs').argv;
var lib = require('../util/lib');

module.exports = function(gulp, common) {
  var name = argv.name,
    isMobile = argv.m;
  var htmlPath = `${common.config.paths.src.root}${isMobile
      ? common.config.paths.src.htmlMobile
      : common.config.paths.src.html}`,
    cssPath = `${common.config.paths.src.root}${isMobile
      ? common.config.paths.src.cssMobile
      : common.config.paths.src.css}`,
    jsPath = `${common.config.paths.src.root}${isMobile
      ? common.config.paths.src.jsMobile
      : common.config.paths.src.js}`,
    jsonPath = `${common.config.paths.src.root}${isMobile
      ? common.config.paths.src.jsonMobile
      : common.config.paths.src.json}`;
  gulp.task('del_page', function() {
    lib.delFile(htmlPath);
    lib.delFile(cssPath);
    lib.delFile(jsPath);
    lib.delFile(jsonPath);
  });
};
