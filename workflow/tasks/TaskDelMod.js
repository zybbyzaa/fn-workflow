var argv = require('yargs').argv;
module.exports = function (gulp, common) {
    var name = argv.name,
           isMobile = argv.m;
    var htmlName =  (isMobile ? 'm/' : '') + name + '.html',
           cssName = (isMobile ? 'm/mod-' : 'mod-') + name + '.scss';
    var htmlPath = './src/html/' + (isMobile ? 'm/' : '') + 'include' + '/' + htmlName;
    var cssPath = './src/css' + '/' + cssName;
    gulp.task('del_mod', function() {
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
    });
};
