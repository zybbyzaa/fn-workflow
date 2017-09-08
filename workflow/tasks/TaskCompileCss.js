var lib = require('../util/lib');
var merge2 = require('merge2');
var postcssPxtorem = require('postcss-pxtorem'); // 转换 px 为 rem
var postcssAutoprefixer = require('autoprefixer');
var postcssSprites = require('postcss-sprites');
var path = require('path');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;

module.exports = function (gulp, common) {
    var postcssOption = [
        postcssAutoprefixer({
            browsers: common.config["autoprefixer"]['pc']
        })
    ];
    if (argv.env === 'prod') {
        var postcssSpritesConfig = {
            retina: false,
            verbose: true,
            spritePath: './dist/images', // 雪碧图合并后存放地址
            stylesheetPath: '../dist/css',
            basePath: './',
            spritesmith: {
                padding: 2
            },
            filterBy(image) {
                if (image.url.indexOf('/images/sprites/') === -1) {
                    return Promise.reject();
                }
                return Promise.resolve();
            },
            groupBy(image) {
                return lib.spritesGroupBy(image);
            },
            hooks: {
                onUpdateRule(rule, comment, image) {
                    var spriteUrl = image.spritePath.replace('dist', '../..');
                    image.spriteUrl = `${spriteUrl}?t=${+new Date()}`;
                    return lib.spritesOnUpdateRule(rule, comment, image);
                },
                onSaveSpritesheet(opts, groups) {
                    return lib.spritesOnSaveSpritesheet(opts, groups);
                }
            }
        };
        postcssOption.push(postcssSprites(postcssSpritesConfig));
    }

    gulp.task('compile_css', function () {
        common.plugins.util.log('开始编译scss');
        var srcPath = `${common.config.paths.src.root}${common.config.paths.src.css}`;
        var distPath = `${common.config.paths.dist.root}${common.config.paths.dist.css}`;
        var srcLibPath = `${common.config.paths.src.root}${common.config.paths.src.cssLib}`;
        var distLibPath = `${common.config.paths.dist.root}${common.config.paths.dist.cssLib}`;
        var cssStream = gulp.src([path.join(srcPath, 'style-*.scss')])
            .pipe(common.plugins.plumber(lib.handleErrors))
            .pipe(common.plugins.changed(distPath))
            .pipe(common.plugins.logger({ showChange: true }))
            .pipe(common.plugins.sass())
            .on('error', common.plugins.sass.logError)
            .pipe(common.plugins.filter(function (file) {
                if (/.css$/.test(file.path))
                    return true;
                return false;
            }))
            .pipe(common.plugins.plumber(lib.handleErrors))
            .pipe(common.plugins.logger({ showChange: true }))
            .pipe(common.plugins.postcss(postcssOption))
            .pipe(common.plugins.base64({
                extensions: ['svg', 'png', 'jpg'],
                maxImageSize: 8 * 1024, // bytes,
                deleteAfterEncoding: false
            }))
            .pipe(gulp.dest(distPath))
            .on('end', function () {
                common.plugins.util.log('pc端样式编译完成');
            });
        var cssLibStream = gulp.src(srcLibPath)
            .pipe(common.plugins.plumber(lib.handleErrors))
            .pipe(gulp.dest(distLibPath))
        return merge2(cssStream, cssLibStream).on('end', function () {
            lib.task_log('compile_css')
            lib.reloadhandle();
        });
    });
}
