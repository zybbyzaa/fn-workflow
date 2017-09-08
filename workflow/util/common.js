// 声明插件以及配置文件的依赖
var plugins = require('gulp-load-plugins')(),
    packageInfo = require('../../package.json'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    config;

// 读取项目配置表
try {
    config = require('../../config.js');
} catch (_event) {
    plugins.util.log(plugins.util.colors.red('Gulp Config Error: ') + '找不到项目配置文件');
}

// 创建 common 对象
var common = {};

common.plugins = plugins;
common.config = config;
common.packageInfo = packageInfo;
common.browserSync = browserSync;
common.reload = reload;

module.exports = common;