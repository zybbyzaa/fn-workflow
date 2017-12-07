// 声明插件以及配置文件的依赖
var fs = require('fs');
var plugins = require('gulp-load-plugins')(),
  packageInfo = require('../../package.json'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  config,
  localConfig = {};

// 读取项目默认配置
try {
  config = require('../../config/default.js');
} catch (_event) {
  plugins.util.log(
    plugins.util.colors.red('Gulp Config Error: ') + '找不到项目配置文件'
  );
}

// 读取项目本地配置
try {
  localConfig = require('../../config/local.js');
} catch (_event) {
  plugins.util.log(
    plugins.util.colors.red('Gulp Config Error: ') + '找不到项目配置文件'
  );
}

// 创建 common 对象
var common = {};

common.plugins = plugins;
common.config = Object.assign(config, localConfig);
common.packageInfo = packageInfo;
common.browserSync = browserSync;
common.reload = reload;

module.exports = common;
