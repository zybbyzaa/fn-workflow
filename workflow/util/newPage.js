var fs = require('fs'),
    path = require('path'),
    argv = require('yargs').argv,
    temple = require('./temple')(argv);

module.exports = function (argv) {
    var name = argv.name;
    var precss = argv.css;
    var isMobile = argv.m;
    var htmlPath = './src/html/' + (isMobile ? 'm/' : '') + name + '.html';
    var cssPath = './src/css/' + (isMobile ? 'm/style-' : 'style-') + name + '.scss';
    var jsPath = './src/js/' + (isMobile ? 'm/' : '') + name + '.js';

    var outHtml = fs.createWriteStream(htmlPath, {encoding: "utf8"});
    outHtml.write((isMobile?temple['mhtml'].join('\n'):temple['html'].join('\n')), function (err) {
        if (err) console.log(err);
    });
    outHtml.end();
    var outCss = fs.createWriteStream(cssPath, {encoding: "utf8"});
    outCss.write(temple['scss'].join('\n'), function (err) {
        if (err) console.log(err);
    });
    outCss.end();
    var outJs = fs.createWriteStream(jsPath, {encoding: "utf8"});
    outJs.write(temple['js'].join('\n'), function (err) {
        if (err) console.log(err);
    });
    outJs.end();
}