module.exports = function (argv) {
    var name = argv.name;
    var precss = argv.css;
    var isMobile = argv.m;
    return {
        'html': [
            '<!DOCTYPE html>',
            '<head>',
            '<meta charset="utf-8">',
            '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">',
            '<title>'+name+'</title>',
            '<link rel="stylesheet" href="/css/style-'+name+'.css">',
            '</head>',
            '<body>',
            '',
            '<script src="/js/lib/jquery-1.10.2.min.js"/>',
            '<script src="/js/'+name+'.js"/>',
            '</body>'
        ],
        'mhtml': [
            '<!DOCTYPE html>',
            '<head>',
            '<meta charset="utf-8">',
            '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">',
            '<title>'+name+'</title>',
            '<link rel="stylesheet" href="/css/m/style-'+name+'.css">',
            '</head>',
            '<body>',
            '<script src="/js/lib/jquery-1.10.2.min.js"/>',
            '<script src="/js/m/'+name+'.js"/>',
            '</body>'
        ],
        'scss': [
            '/* 引入库文件 */',
            '@import "./lib/lib-variables";',
            '@import "./lib/lib-mixin";',
            '@import "./lib/lib-media";',
            '@import "./lib/lib-reset";',
            '@import "./lib/lib-help";'
        ],
        'js': [
            '$(function(){',
            '',
            '});'
        ]
    }
}
