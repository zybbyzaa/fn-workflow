var fs = require('fs'),
    path = require('path'),
    argv = require('yargs').argv,
    temple = require('./temple')(argv);

module.exports = function (argv,common) {
    var name = argv.name;
    var precss = argv.css;
    var isMobile = argv.m;
    var htmlPath = './src/html/' + (isMobile ? 'm/' : '') + name + '.html';
    var cssPath = './src/css/' + (isMobile ? 'm/style-' : 'style-') + name + '.scss';
    var jsPath = './src/js/' + (isMobile ? 'm/' : '') + name + '.js';

    var outHtml = fs.createWriteStream(htmlPath, {encoding: "utf8"});
    outHtml.write((isMobile?temple['mhtml'].join('\n'):temple['html'].join('\n')), function (err) {
        if (err) common.plugins.util.log('创建文件' + htmlPath + '失败！\n',err);
        common.plugins.util.log('创建文件' + htmlPath + '成功！');
    });
    outHtml.end();
    var outCss = fs.createWriteStream(cssPath, {encoding: "utf8"});
    outCss.write(temple['scss'].join('\n'), function (err) {
        if (err) common.plugins.util.log('创建文件' + cssPath + '失败！\n',err);
        common.plugins.util.log('创建文件' + cssPath + '成功！');        
    });
    outCss.end();
    var outJs = fs.createWriteStream(jsPath, {encoding: "utf8"});
    outJs.write(temple['js'].join('\n'), function (err) {
        if (err) common.plugins.util.log('创建文件' + jsPath + '失败！\n',err);
        common.plugins.util.log('创建文件' + jsPath + '成功！');
    });
    outJs.end();
}