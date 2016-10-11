var lib = require('../util/lib');
var argv = require('yargs').argv;
module.exports = function (gulp, common) {
    var name = argv.name,
           isMobile = argv.m;
    var htmlName =  (isMobile ? 'm/' : '') + name + '.html',
           cssName = (isMobile ? 'm/style-' : 'style-') + name + '.scss',
           jsName = (isMobile ? 'm/' : '') + name + '.js';
    var htmlPath = './src/html' + '/' + htmlName;
    var cssPath = './src/css' + '/' + cssName;
    var jsPath = './src/js' + '/' + jsName;
    gulp.task('del_page', function() {
        if(lib.fileExist(htmlPath)){
          del([htmlPath]).then(function () {
              common.plugins.util.log(common.plugins.util.colors.red('删除' + htmlPath + '成功'));
          });
        }
        if(lib.fileExist(cssPath)){
          del([cssPath]).then(function () {
              common.plugins.util.log(common.plugins.util.colors.red('删除' + cssPath + '成功'));
          });
        }
        if(lib.fileExist(jsPath)){
          del([jsPath]).then(function () {
              common.plugins.util.log(common.plugins.util.colors.red('删除' + jsPath + '成功'));
          });
        }
    });
};
