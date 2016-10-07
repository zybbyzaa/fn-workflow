var fs = require('fs'),
    path = require('path'),
    argv = require('yargs').argv,
    temple = require('./temple')(argv);

module.exports = function (argv,common) {
    var name = argv.name;
    var precss = argv.css;
    var isMobile = argv.m;
    var htmlPath = './src/html/include' + (isMobile ? 'm/include' : '') + name + '.html';
    var cssPath = './src/css/' + (isMobile ? 'm/mod-' : 'mod-') + name + '.scss';

    var outHtml = fs.createWriteStream(htmlPath, {encoding: "utf8"});
    outHtml.write('\n', function (err) {
        if (err) common.plugins.util.log('创建文件' + htmlPath + '失败！\n',err);
        common.plugins.util.log('创建文件' + htmlPath + '成功！');
    });
    outHtml.end();
    var outCss = fs.createWriteStream(cssPath, {encoding: "utf8"});
    outCss.write('\n', function (err) {
        if (err) common.plugins.util.log('创建文件' + cssPath + '失败！\n',err);
        common.plugins.util.log('创建文件' + cssPath + '成功！');        
    });
    outCss.end();
}