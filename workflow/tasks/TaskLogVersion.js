// 显示项目的版本号

module.exports = function (gulp, common) {
    gulp.task('log_version', function(cb) {
        common.plugins.util.log(common.plugins.util.colors.green(common.config.projectName + ' 的版本号: ' + common.packageInfo.version));
        cb();
    });
};
