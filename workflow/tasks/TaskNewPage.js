var argv = require('yargs').argv;
module.exports = function (gulp, common) {
    var name = argv.name,
           isMobile = argv.m;
    var srcHtmlPath = isMobile ? common.config.paths.tpl.mhtml : common.config.paths.tpl.html,
           srcCssPath = common.config.paths.tpl.css,
           srcJsPath = common.config.paths.tpl.js;
    var htmlName =  (isMobile ? 'm/' : '') + name + '.html',
           cssName = (isMobile ? 'm/style-' : 'style-') + name + '.scss',
           jsName = (isMobile ? 'm/' : '') + name + '.js';
    var htmlPath = './src/html';
    var cssPath = './src/css';
    var jsPath = './src/js';
    gulp.task('new_page', function() {
        gulp.src(srcHtmlPath)
            .pipe(common.plugins.ejs({name: name}))
            .pipe(common.plugins.rename(htmlName))
            .pipe(gulp.dest(htmlPath))
            .on('end',function(){
                common.plugins.util.log('创建文件' + htmlPath + '/' + htmlName   + '成功！');
            });
        gulp.src(srcCssPath)
            .pipe(common.plugins.rename(cssName))
            .pipe(gulp.dest(cssPath))
            .on('end',function(){
                common.plugins.util.log('创建文件' + cssPath + '/' + cssName   + '成功！');
            });
        gulp.src(srcJsPath)
            .pipe(common.plugins.rename(jsName))
            .pipe(gulp.dest(jsPath))
            .on('end',function(){
                common.plugins.util.log('创建文件' + jsPath + '/' + jsName   + '成功！');
            });
    });
};
